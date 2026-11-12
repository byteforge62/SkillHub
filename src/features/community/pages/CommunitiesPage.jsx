import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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

  const communities = communitiesResponse?.data || [];

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Learn together
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Communities
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
          Find a learning community, share progress, and exchange ideas with
          other members.
        </p>
      </header>

      <Card className="mt-7">
        <h2 className="text-lg font-semibold">Start a community</h2>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            createMutation.mutate({
              name: form.name,
              description: form.description,
            });
          }}
        >
          <label className="text-sm font-medium">
            Name
            <input
              className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              minLength={2}
              maxLength={100}
              required
            />
          </label>
          <label className="text-sm font-medium sm:row-span-2">
            Description
            <textarea
              className="mt-1 block min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              maxLength={5000}
              required
            />
          </label>
          {createMutation.isError && (
            <p className="text-sm text-error sm:col-span-2" role="alert">
              {createMutation.error?.response?.data?.message ||
                "The community could not be created."}
            </p>
          )}
          <div className="sm:col-span-2">
            <Button loading={createMutation.isPending} type="submit">
              Create community
            </Button>
          </div>
        </form>
      </Card>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Explore communities</h2>
        {isLoading ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-xl bg-surface-hover"
              />
            ))}
            <span className="sr-only">Loading communities...</span>
          </div>
        ) : isError ? (
          <Card className="mt-4">
            <p className="text-sm text-error" role="alert">
              Communities could not be loaded.
            </p>
            <Button
              className="mt-4"
              variant="secondary"
              size="sm"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </Card>
        ) : communities.length === 0 ? (
          <Card className="mt-4">
            <p className="text-sm text-text-muted">
              No communities yet. Create one to start the first discussion.
            </p>
          </Card>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((community) => (
              <Card key={community._id} className="flex h-full flex-col">
                <h3 className="text-lg font-semibold">{community.name}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-text-muted">
                  {community.description}
                </p>
                <p className="mt-4 text-xs text-text-secondary">
                  {community.members?.length || 0} members
                </p>
                <Link
                  to={`/communities/${community._id}`}
                  className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
                >
                  Open community
                </Link>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
