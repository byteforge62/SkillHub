import { UserCircle } from "lucide-react";

import Button from "@/components/ui/Button";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import useLogout from "@/features/auth/hooks/useLogout";

export const Header = () => {
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
      <h1 className="text-lg font-semibold text-text-primary">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <UserCircle
            size={32}
            aria-hidden="true"
            className="text-text-secondary"
          />

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text-primary">
              {user?.fullname || "User"}
            </p>

            <p className="text-xs text-text-secondary">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          loading={logoutMutation.isPending}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;