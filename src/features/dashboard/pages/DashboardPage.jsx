import useLogout from "@/features/auth/hooks/useLogout"
import Button from "@/components/ui/Button";

export const DashboardPage = () => {
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  }
  return (
    <div>
      <h1>Dashboard</h1>

      <Button
        type="button"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </Button>
    </div>
  )
}
