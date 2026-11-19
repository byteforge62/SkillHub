import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageSquare, Pin, RefreshCw, Trash2, Users } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { Textarea } from "@/components/ui/Input";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";

import {
  addPostComment,
  createPost,
  deletePost,
  getCommunityById,
  getCommunityPosts,
  joinCommunity,
  leaveCommunity,
  togglePostLike,
} from "../api/communityApi";

const userIdOf = (value) => String(value?._id ?? value ?? "");

const formatTimestamp = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recently" : date.toLocaleString();
};

export const CommunityDetailPage = () => {
  const { communityId } = useParams();
  const [page, setPage] = useState(1);
  const [postContent, setPostContent] = useState("");
  const [commentDrafts, setCommentDrafts] = useState({});
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  const communityQuery = useQuery({
    queryKey: ["community", communityId],
    queryFn: () => getCommunityById(communityId),
    enabled: Boolean(communityId),
  });

  const postsQuery = useQuery({
    queryKey: ["community-posts", communityId, page],
    queryFn: () => getCommunityPosts(communityId, { page, limit: 10 }),
    enabled: Boolean(communityId),
  });

  const community = communityQuery.data?.data;
  const currentUserId = userIdOf(currentUser?._id ?? currentUser?.id);
  const member = community?.members?.find(
    (item) => userIdOf(item.userId) === currentUserId,
  );
  const isSiteAdmin = currentUser?.role === "admin";
  const canPost = Boolean(member || isSiteAdmin);

  const invalidateCommunity = () => {
    queryClient.invalidateQueries({ queryKey: ["community", communityId] });
    queryClient.invalidateQueries({ queryKey: ["community-posts", communityId] });
  };

  const joinMutation = useMutation({
    mutationFn: () => joinCommunity(communityId),
    onSuccess: invalidateCommunity,
  });
  const leaveMutation = useMutation({
    mutationFn: () => leaveCommunity(communityId),
    onSuccess: invalidateCommunity,
  });
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setPostContent("");
      invalidateCommunity();
    },
  });
  const likeMutation = useMutation({
    mutationFn: togglePostLike,
    onSuccess: invalidateCommunity,
  });
  const commentMutation = useMutation({
    mutationFn: addPostComment,
    onSuccess: (_response, variables) => {
      setCommentDrafts((drafts) => ({ ...drafts, [variables.postId]: "" }));
      invalidateCommunity();
    },
  });
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: invalidateCommunity,
  });

  if (communityQuery.isLoading) {
    return (
      <main className="container-wide py-12" role="status">
        <Skeleton className="h-40 w-full rounded-3xl" />
        <Skeleton className="mt-4 h-64 w-full rounded-3xl" />
        <span className="sr-only">Loading community...</span>
      </main>
    );
  }

  if (communityQuery.isError || !community) {
    return (
      <main className="container-narrow py-14 sm:py-20">
        <EmptyState
          tone="error"
          icon={RefreshCw}
          title="This community couldn't be loaded"
          description="It may have been removed, or the link is no longer valid."
          action={
            <div className="flex flex-wrap justify-center gap-2.5">
              {communityQuery.isError && (
                <Button variant="secondary" onClick={() => communityQuery.refetch()}>
                  Try again
                </Button>
              )}
              <Button as={Link} to="/communities" variant="ghost">
                Browse communities
              </Button>
            </div>
          }
        />
      </main>
    );
  }

  const feed = postsQuery.data?.data;
  const posts = feed?.posts || [];
  const totalPages = Math.ceil((feed?.total || 0) / (feed?.limit || 10));
  const canManageCommunity = isSiteAdmin || member?.role === "admin";

  return (
    <main>
      <section className="sage-mesh relative overflow-hidden border-b border-[color:var(--color-line)]">
        <div className="architectural-grid absolute inset-0" aria-hidden="true" />

        <div className="container-wide relative py-10 sm:py-14">
          <Link
            to="/communities"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-text-muted transition-colors hover:text-primary"
          >
            ← All communities
          </Link>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-2xl">
              <Badge variant="outline" size="sm" icon={Users}>
                {community.members?.length || 0} members
              </Badge>

              <h1 className="mt-4 text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.04em]">
                {community.name}
              </h1>

              <p className="mt-4 whitespace-pre-line text-[14.5px] leading-7 text-text-secondary">
                {community.description}
              </p>
            </div>

            <div className="shrink-0">
              {member ? (
                <Button
                  variant="secondary"
                  loading={leaveMutation.isPending}
                  onClick={() => leaveMutation.mutate()}
                >
                  Leave community
                </Button>
              ) : !isSiteAdmin ? (
                <Button
                  loading={joinMutation.isPending}
                  onClick={() => joinMutation.mutate()}
                >
                  Join community
                </Button>
              ) : null}
            </div>
          </div>

          {(joinMutation.isError || leaveMutation.isError) && (
            <p className="mt-4 text-[12.5px] text-error" role="alert">
              {joinMutation.error?.response?.data?.message ||
                leaveMutation.error?.response?.data?.message ||
                "Your membership could not be updated."}
            </p>
          )}
        </div>
      </section>

      <section className="container-wide py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {canPost ? (
            <Card>
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">
                Start a discussion
              </h2>

              <form
                className="mt-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  createPostMutation.mutate({ communityId, content: postContent });
                }}
              >
                <label className="sr-only" htmlFor="community-post-content">
                  Post content
                </label>

                <Textarea
                  id="community-post-content"
                  placeholder="Share a question, an idea, or a learning milestone..."
                  value={postContent}
                  onChange={(event) => setPostContent(event.target.value)}
                  rows={4}
                  maxLength={10000}
                  required
                />

                {createPostMutation.isError && (
                  <p className="mt-2 text-[12.5px] text-error" role="alert">
                    {createPostMutation.error?.response?.data?.message ||
                      "Your post could not be published."}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[11.5px] text-text-muted">
                    {postContent.length}/10000
                  </span>
                  <Button
                    loading={createPostMutation.isPending}
                    type="submit"
                    size="sm"
                  >
                    Publish post
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card variant="sage" className="text-center">
              <p className="text-[13.5px] font-medium text-primary">
                Join this community to start a discussion.
              </p>
              <p className="mt-1 text-[12.5px] text-text-secondary">
                You can read every public thread without joining.
              </p>
            </Card>
          )}

          <div className="mt-8 flex items-end justify-between gap-3">
            <h2 className="text-[19px] font-bold tracking-[-0.03em]">Discussion</h2>
            {posts.length > 0 && (
              <span className="text-[12px] text-text-muted">
                {feed?.total ?? posts.length} posts
              </span>
            )}
          </div>

          <div className="mt-4 space-y-3">
            {postsQuery.isLoading &&
              [0, 1].map((item) => <Skeleton key={item} className="h-40 rounded-3xl" />)}

            {postsQuery.isError && (
              <EmptyState
                tone="error"
                icon={RefreshCw}
                title="Posts couldn't be loaded"
                description="The discussion feed did not respond."
                action={
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => postsQuery.refetch()}
                  >
                    Try again
                  </Button>
                }
              />
            )}

            {!postsQuery.isLoading && !postsQuery.isError && posts.length === 0 && (
              <EmptyState
                icon={MessageSquare}
                title="No discussions yet"
                description="Be the first to post a question or share what you're working on."
              />
            )}

            {posts.map((post) => {
              const isAuthor = userIdOf(post.userId) === currentUserId;
              const canDelete = isAuthor || isSiteAdmin || canManageCommunity;
              const hasLiked = post.likes?.some(
                (likedBy) => userIdOf(likedBy) === currentUserId,
              );
              const comments = post.comments || [];

              return (
                <Card key={post._id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar
                        src={post.userId?.avatar}
                        name={post.userId?.fullname}
                        size="sm"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-semibold text-text-primary">
                          {post.userId?.fullname || "Community member"}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-text-muted">
                          {formatTimestamp(post.createdAt)}
                          {post.isPinned && (
                            <span className="inline-flex items-center gap-1 text-primary">
                              <Pin size={10} aria-hidden="true" />
                              Pinned
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconLeft={Trash2}
                        loading={
                          deletePostMutation.isPending &&
                          deletePostMutation.variables === post._id
                        }
                        onClick={() => {
                          if (window.confirm("Delete this post?")) {
                            deletePostMutation.mutate(post._id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </div>

                  <p className="mt-4 whitespace-pre-line text-[13.5px] leading-7 text-text-secondary">
                    {post.content}
                  </p>

                  <div className="mt-4 flex items-center gap-4 border-t border-border-subtle pt-3.5">
                    <button
                      type="button"
                      aria-pressed={Boolean(hasLiked)}
                      onClick={() => likeMutation.mutate(post._id)}
                      className={[
                        "inline-flex items-center gap-1.5 text-[12px] font-medium transition-colors",
                        hasLiked ? "text-primary" : "text-text-muted hover:text-primary",
                      ].join(" ")}
                    >
                      <Heart
                        size={13}
                        strokeWidth={2}
                        fill={hasLiked ? "currentColor" : "none"}
                        aria-hidden="true"
                      />
                      {post.likeCount ?? post.likes?.length ?? 0}
                    </button>

                    <span className="inline-flex items-center gap-1.5 text-[12px] text-text-muted">
                      <MessageSquare size={13} strokeWidth={2} aria-hidden="true" />
                      {post.commentCount ?? comments.length}
                    </span>
                  </div>

                  {comments.length > 0 && (
                    <div className="mt-4 space-y-3 border-l-2 border-sage-soft pl-4">
                      {comments.map((comment) => (
                        <div key={comment._id}>
                          <p className="text-[11.5px] font-semibold text-text-secondary">
                            {comment.userId?.fullname || "Member"}
                          </p>
                          <p className="mt-0.5 whitespace-pre-line text-[12.5px] leading-6 text-text-muted">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <form
                    className="mt-4 flex flex-col gap-2 sm:flex-row"
                    onSubmit={(event) => {
                      event.preventDefault();
                      commentMutation.mutate({
                        postId: post._id,
                        content: commentDrafts[post._id] || "",
                      });
                    }}
                  >
                    <label className="sr-only" htmlFor={`comment-${post._id}`}>
                      Add a comment
                    </label>

                    <input
                      id={`comment-${post._id}`}
                      className="h-10 flex-1 rounded-full border border-[color:var(--color-line)] bg-white px-4 text-[13px] text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                      placeholder="Add a comment"
                      value={commentDrafts[post._id] || ""}
                      onChange={(event) =>
                        setCommentDrafts((drafts) => ({
                          ...drafts,
                          [post._id]: event.target.value,
                        }))
                      }
                      maxLength={5000}
                      required
                    />

                    <Button
                      size="sm"
                      loading={
                        commentMutation.isPending &&
                        commentMutation.variables?.postId === post._id
                      }
                      type="submit"
                    >
                      Comment
                    </Button>
                  </form>
                </Card>
              );
            })}

            {(likeMutation.isError ||
              commentMutation.isError ||
              deletePostMutation.isError) && (
              <p className="text-[12.5px] text-error" role="alert">
                {likeMutation.error?.response?.data?.message ||
                  commentMutation.error?.response?.data?.message ||
                  deletePostMutation.error?.response?.data?.message ||
                  "The requested discussion action failed."}
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-6 flex items-center justify-between gap-4 border-t border-[color:var(--color-line)] pt-5"
              aria-label="Discussion pages"
            >
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((current) => current - 1)}
              >
                Previous
              </Button>

              <Badge variant="outline" size="sm">
                Page {feed.page} of {totalPages}
              </Badge>

              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </Button>
            </nav>
          )}
        </div>
      </section>
    </main>
  );
};

export default CommunityDetailPage;
