import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, MessagesSquare, Plus, RefreshCw } from "lucide-react";

import { AvatarStack } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Input, { Textarea } from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";

import { createCommunity, getCommunities } from "../api/communityApi";

export const CommunitiesPage = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const queryClient = useQueryClient();

  const {
    data: communitiesResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });

  const createMutation = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      setForm({ name: "", description: "" });
    },
  });

  const communities = communitiesResponse?.data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Community"
        title="Rooms for the parts you can't learn alone"
        description="Post a question, share a milestone, or read how someone else solved the same problem. Every community keeps its own discussion feed."
      />

      <div className="editorial-split mt-7">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="section-label">Explore communities</h2>
            {!isLoading && !isError && (
              <span className="text-[11.5px] text-text-muted">
                {communities.length}{" "}
                {communities.length === 1 ? "community" : "communities"}
              </span>
            )}
          </div>

          {isLoading && (
            <div className="space-y-2" role="status">
              {[0, 1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-20 rounded-[16px]" />
              ))}
              <span className="sr-only">Loading communities...</span>
            </div>
          )}

          {isError && (
            <EmptyState
              tone="error"
              icon={RefreshCw}
              title="Communities couldn't be loaded"
              description="We could not reach the community list. Try again in a moment."
              action={
                <Button variant="secondary" onClick={() => refetch()}>
                  Try again
                </Button>
              }
            />
          )}

          {!isLoading && !isError && communities.length === 0 && (
            <EmptyState
              icon={MessagesSquare}
              title="No communities yet"
              description="Create the first one and start the discussion."
            />
          )}

          {!isLoading && !isError && communities.length > 0 && (
            <div className="overflow-hidden rounded-[16px] border border-line bg-white">
              <div className="divide-y divide-line">
                {communities.map((community) => {
                  const people = community.recentMembers?.length
                    ? community.recentMembers
                    : community.members || [];

                  return (
                    <Link
                      key={community._id}
                      to={`/communities/${community._id}`}
                      className="group flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-sage/60 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[14px] font-semibold tracking-[-0.01em] text-text-primary">
                          #{community.name.toLowerCase().replace(/\s+/g, "-")}
                        </h3>

                        <p className="mt-1 line-clamp-1 text-[12.5px] text-text-secondary">
                          {community.description}
                        </p>

                        <p className="mt-1 text-[11.5px] text-text-muted">
                          {community.memberCount ?? community.members?.length ?? 0}{" "}
                          members
                          {community.postCount > 0
                            ? ` · ${community.postCount} posts`
                            : ""}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-4">
                        <AvatarStack people={people} max={3} size="sm" />

                        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-primary">
                          Open
                          <ArrowUpRight
                            size={12}
                            className="transition-transform group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <aside>
          <section className="rounded-[16px] border border-line bg-white px-5 py-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-primary">
                <Plus size={15} strokeWidth={2} aria-hidden="true" />
              </span>
              <h2 className="text-[14px] font-semibold tracking-[-0.01em]">
                Start a community
              </h2>
            </div>

            <p className="mt-2 text-[12.5px] leading-[1.55] text-text-muted">
              Give it a clear name — members should know the subject before they
              join.
            </p>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                createMutation.mutate({
                  name: form.name,
                  description: form.description,
                });
              }}
            >
              <Input
                label="Name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                minLength={2}
                maxLength={100}
                placeholder="Frontend study group"
                required
              />

              <Textarea
                label="Description"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                rows={4}
                maxLength={5000}
                placeholder="Who is this for, and what will you discuss?"
                required
              />

              {createMutation.isError && (
                <p className="text-[12px] text-error" role="alert">
                  {createMutation.error?.response?.data?.message ||
                    "The community could not be created."}
                </p>
              )}

              <Button
                fullWidth
                loading={createMutation.isPending}
                type="submit"
                iconLeft={Plus}
                size="sm"
              >
                Create community
              </Button>

              <p className="text-[11px] leading-[1.55] text-text-muted">
                Sign in first if you are browsing as a guest.
              </p>
            </form>
          </section>

          <section className="mt-5 rounded-[16px] bg-sage px-5 py-5">
            <h2 className="section-label">Prefer structured learning?</h2>
            <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary">
              Courses pair discussion with lessons, quizzes and progress tracking.
            </p>
            <Link
              to="/courses"
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-primary"
            >
              Browse tracks
              <ArrowUpRight size={12} aria-hidden="true" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default CommunitiesPage;
