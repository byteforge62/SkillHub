import {
  Menu,
  UserCircle,
} from "lucide-react";

import Button from "@/components/ui/Button";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import useLogout from "@/features/auth/hooks/useLogout";

export const Header = ({title = "Dashboard",onMenuClick}) => {
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      {/* Left side */}

      <div className="flex items-center gap-3">
        {/* Mobile menu */}

        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary md:hidden"
        >
          <Menu
            size={20}
            aria-hidden="true"
          />
        </button>

        <h1 className="text-lg font-semibold text-text-primary">
          {title}
        </h1>
      </div>

      {/* Right side */}

      <div className="flex items-center gap-3 sm:gap-4">
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
