import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

export const UnauthorizedPage = () => (
  <main className="flex min-h-[70vh] items-center justify-center px-5 py-16">
    <EmptyState
      icon={ShieldAlert}
      title="You don't have access to this page"
      description="Your account is signed in, but this area needs different permissions. Go back to your workspace, or sign in with another account."
      className="w-full max-w-lg bg-white"
      action={
        <div className="flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/dashboard" iconLeft={ArrowLeft}>
            Back to workspace
          </Button>
          <Button as={Link} to="/login" variant="secondary">
            Sign in again
          </Button>
        </div>
      }
    />
  </main>
);

export default UnauthorizedPage;
