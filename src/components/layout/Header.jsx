import { UserCircle } from "lucide-react"

import useCurrentUser from "@/features/auth/hooks/useCurrentUser"
import useLogout from "@/features/auth/hooks/useLogout"

export const Header = () => {
    const { data: user } = useCurrentUser();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    }
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
            <div>
                <h1 className="text-lg font-semibold text-text-primary">
                    Dashboard
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <UserCircle
                        size={32}
                        className="text-text-secondary"
                    />

                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-text-primary">
                            {user?.fullname}
                        </p>

                        <p className="text-xs text-text-secondary">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="rounded-lg border border-border px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
            </div>
        </header>
    )
}
