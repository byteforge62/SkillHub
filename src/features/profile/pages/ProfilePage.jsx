import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import { ProfileOverview } from "./ProfileOverview";

export const ProfilePage = () => {
  const { data: user, isLoading, isError, refetch } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl" role="status">
        <div className="h-64 animate-pulse rounded-2xl bg-surface-hover" />
        <span className="sr-only">Loading profile...</span>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-error" role="alert">
          Your profile could not be loaded.
        </p>
        <button
          className="mt-4 inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary hover:bg-surface-hover"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  return <ProfileOverview user={user} onEditClick={() => window.location.href = "/profile/edit"} />;
};