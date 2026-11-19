import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";

import { ProfileOverview } from "./ProfileOverview";

export const ProfilePage = () => {
  const { data: user, isLoading, isError, refetch } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-5" role="status">
        <Skeleton className="h-9 w-52" />
        <div className="rounded-3xl border border-[color:var(--color-line)] bg-white p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="flex-1 space-y-2.5">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-11 w-32 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-48 w-full rounded-3xl" />
        <span className="sr-only">Loading profile...</span>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <EmptyState
        tone="error"
        icon={RefreshCw}
        title="Your profile couldn't be loaded"
        description="We could not reach your account details. Try again, or head back to your workspace."
        action={
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button variant="secondary" onClick={() => refetch()}>
              Try again
            </Button>
            <Button as={Link} to="/dashboard" variant="ghost">
              Back to dashboard
            </Button>
          </div>
        }
      />
    );
  }

  return <ProfileOverview user={user} />;
};

export default ProfilePage;
