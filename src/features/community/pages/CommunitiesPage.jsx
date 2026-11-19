import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, MessagesSquare, Plus, RefreshCw, Users } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input, { Textarea } from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";

import { createCommunity, getCommunities } from "../api/communityApi";

export const CommunitiesPage = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const queryClient = useQueryClient();

  const { data: communitiesResponse, isLoading, isError, refetch } = useQuery({
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

  const communities = communitiesResponse?.data || [];

  return (
    <main>
      <section className="sage-mesh relative overflow-hidden border-b border-[color:var(--color-line)]">
        <div className="architectural-grid absolute inset-0" aria-hidden="true" />

        <div className="container-wide relative py-14 sm:py-20">
          <p className="text-eyebrow uppercase tracking-[0.14em]">Learn together</p>

          <h1 className="display-2 mt-4 max-w-3xl">
            Communities for the parts you can't learn alone.
          </h1>

          <p className="text-lead mt-5 max-w-2xl">
            Post a question, share a milestone, or read how someone else solved the
            same problem. Every community keeps its own discussion feed.
          </p>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[19px] font-bold tracking-[-0.03em]">
                Explore communities
              </h2>
              {!isLoading && !isError && (
                <span className="text-[12px] text-text-muted">
                  {communities.length} {communities.length === 1 ? "community" : "communities"}
                </span>
              )}
            </div>

            <div className="mt-4">
              {isLoading && (
                <div className="grid gap-3 sm:grid-cols-2" role="status">
                  {[0, 1, 2, 3].map((item) => (
                    <Skeleton key={item} className="h-40 rounded-3xl" />
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
                <div className="grid gap-3 sm:grid-cols-2">
                  {communities.map((community) => (
                    <Link
                      key={community._id}
                      to={`/communities/${community._id}`}
                      className="group flex h-full flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-hover)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sage text-primary">
                          <Users size={16} strokeWidth={1.9} aria-hidden="true" />
                        </span>

                        <span className="rounded-full bg-background px-2.5 py-1 text-[10.5px] font-medium text-text-secondary">
                          {community.members?.length || 0} members
                        </span>
                      </div>

                      <h3 className="mt-4 line-clamp-2 text-[15.5px] font-bold tracking-[-0.02em] text-text-primary">
                        {community.name}
                      </h3>

                      <p className="mt-2 line-clamp-3 flex-1 text-[12.5px] leading-6 text-text-secondary">
                        {community.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-primary">
                        Open community
                        <ArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Card className="lg:sticky lg:top-[100px]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sage text-primary">
                <Plus size={16} strokeWidth={2} aria-hidden="true" />
              </span>
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">
                Start a community
              </h2>
            </div>

            <p className="mt-2.5 text-[12.5px] leading-6 text-text-muted">
              Give it a clear name — members should know the subject before they join.
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
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                rows={4}
                maxLength={5000}
                placeholder="Who is this for, and what will you discuss?"
                required
              />

              {createMutation.isError && (
                <p className="text-[12.5px] text-error" role="alert">
                  {createMutation.error?.response?.data?.message ||
                    "The community could not be created."}
                </p>
              )}

              <Button
                fullWidth
                loading={createMutation.isPending}
                type="submit"
                iconLeft={Plus}
              >
                Create community
              </Button>

              <p className="text-center text-[11px] leading-5 text-text-muted">
                Sign in first if you are browsing as a guest.
              </p>
            </form>
          </Card>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[color:var(--color-line)] bg-white px-6 py-5">
          <div>
            <p className="text-[14px] font-semibold tracking-[-0.01em]">
              Prefer structured learning?
            </p>
            <p className="mt-1 text-[12.5px] text-text-muted">
              Courses pair discussion with lessons, quizzes and progress tracking.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="sage" size="sm">
              Sections
            </Badge>
            <Badge variant="sage" size="sm">
              Quizzes
            </Badge>
            <Badge variant="sage" size="sm">
              Progress
            </Badge>
            <Button as={Link} to="/courses" size="sm" variant="secondary" iconRight={ArrowRight}>
              Courses
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CommunitiesPage;
