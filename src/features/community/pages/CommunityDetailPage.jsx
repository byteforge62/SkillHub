import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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
    queryClient.invalidateQueries({
      queryKey: ["community-posts", communityId],
    });
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
      setCommentDrafts((drafts) => ({
        ...drafts,
        [variables.postId]: "",
      }));
      invalidateCommunity();
    },
  });
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: invalidateCommunity,
  });

  if (communityQuery.isLoading) {
    return (
      <div className="mx-auto max-w-5xl" role="status">
        <div className="h-48 animate-pulse rounded-2xl bg-surface-hover" />
        <span className="sr-only">Loading community...</span>
      </div>
    );
  }

  if (communityQuery.isError || !community) {
    return (
      <Card className="mx-auto max-w-3xl">
        <p className="text-sm text-error" role="alert">
          This community could not be loaded.
        </p>
        {communityQuery.isError && (
          <Button
            className="mt-4"
            variant="secondary"
            size="sm"
            onClick={() => communityQuery.refetch()}
          >
            Retry
          </Button>
        )}
        <Link
          to="/communities"
          className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
        >
          Browse communities
        </Link>
      </Card>
    );
  }

  const feed = postsQuery.data?.data;
  const posts = feed?.posts || [];
  const totalPages = Math.ceil((feed?.total || 0) / (feed?.limit || 10));
  const canManageCommunity =
    isSiteAdmin || member?.role === "admin";

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/communities"
        className="text-sm font-medium text-text-muted hover:text-primary"
      >
        ← All communities
      </Link>
      <Card className="mt-4">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Learning community
            </p>
            <h1 className="mt-2 text-2xl font-semibold">{community.name}</h1>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text-secondary">
              {community.description}
            </p>
            <p className="mt-4 text-xs text-text-muted">
              {community.members?.length || 0} members
            </p>
          </div>
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
        {(joinMutation.isError || leaveMutation.isError) && (
          <p className="mt-4 text-sm text-error" role="alert">
            {joinMutation.error?.response?.data?.message ||
              leaveMutation.error?.response?.data?.message ||
              "Your membership could not be updated."}
          </p>
        )}
      </Card>

      {canPost && (
        <Card className="mt-6">
          <h2 className="text-lg font-semibold">Start a discussion</h2>
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              createPostMutation.mutate({
                communityId,
                content: postContent,
              });
            }}
          >
            <label className="sr-only" htmlFor="community-post-content">
              Post content
            </label>
            <textarea
              id="community-post-content"
              className="block min-h-28 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Share a question, idea, or learning milestone..."
              value={postContent}
              onChange={(event) => setPostContent(event.target.value)}
              maxLength={10000}
              required
            />
            {createPostMutation.isError && (
              <p className="mt-2 text-sm text-error" role="alert">
                {createPostMutation.error?.response?.data?.message ||
                  "Your post could not be published."}
              </p>
            )}
            <Button className="mt-3" loading={createPostMutation.isPending} type="submit">
              Publish post
            </Button>
          </form>
        </Card>
      )}

      {!canPost && (
        <p className="mt-6 text-sm text-text-muted">
          Join this community to start a discussion.
        </p>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Discussion</h2>
        {postsQuery.isLoading ? (
          <p className="mt-4 text-sm text-text-muted" role="status">
            Loading posts...
          </p>
        ) : postsQuery.isError ? (
          <Card className="mt-4">
            <p className="text-sm text-error" role="alert">
              Posts could not be loaded.
            </p>
            <Button
              className="mt-4"
              variant="secondary"
              size="sm"
              onClick={() => postsQuery.refetch()}
            >
              Retry
            </Button>
          </Card>
        ) : posts.length === 0 ? (
          <Card className="mt-4">
            <p className="text-sm text-text-muted">
              There are no discussions yet.
            </p>
          </Card>
        ) : (
          <div className="mt-4 space-y-4">
            {posts.map((post) => {
              const isAuthor = userIdOf(post.userId) === currentUserId;
              const canDelete =
                isAuthor || isSiteAdmin || canManageCommunity;
              const hasLiked = post.likes?.some(
                (likedBy) => userIdOf(likedBy) === currentUserId,
              );
              const comments = post.comments || [];

              return (
                <Card key={post._id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {post.userId?.fullname || "Community member"}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        {formatTimestamp(post.createdAt)}
                        {post.isPinned && " · Pinned"}
                      </p>
                    </div>
                    {canDelete && (
                      <Button
                        variant="secondary"
                        size="sm"
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
                  <p className="mt-4 whitespace-pre-line text-sm leading-6 text-text-secondary">
                    {post.content}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
                    <button
                      type="button"
                      aria-pressed={Boolean(hasLiked)}
                      onClick={() => likeMutation.mutate(post._id)}
                      className="text-sm font-medium text-text-muted transition-colors hover:text-primary aria-pressed:text-primary"
                    >
                      {hasLiked ? "Liked" : "Like"} · {post.likeCount ?? post.likes?.length ?? 0}
                    </button>
                    <span className="text-sm text-text-muted">
                      {post.commentCount ?? comments.length} comments
                    </span>
                  </div>

                  {comments.length > 0 && (
                    <div className="mt-3 space-y-3 border-l border-border pl-4">
                      {comments.map((comment) => (
                        <div key={comment._id}>
                          <p className="text-xs font-semibold text-text-secondary">
                            {comment.userId?.fullname || "Member"}
                          </p>
                          <p className="mt-1 whitespace-pre-line text-sm text-text-muted">
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
                      className="min-h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm"
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
          </div>
        )}
        {(likeMutation.isError ||
          commentMutation.isError ||
          deletePostMutation.isError) && (
          <p className="mt-3 text-sm text-error" role="alert">
            {likeMutation.error?.response?.data?.message ||
              commentMutation.error?.response?.data?.message ||
              deletePostMutation.error?.response?.data?.message ||
              "The requested discussion action failed."}
          </p>
        )}
        {totalPages > 1 && (
          <nav
            className="mt-5 flex items-center justify-between"
            aria-label="Discussion pages"
          >
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-text-muted">
              Page {feed.page} of {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              Next
            </Button>
          </nav>
        )}
      </section>
    </div>
  );
};
