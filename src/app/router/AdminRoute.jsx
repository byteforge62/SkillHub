import { Navigate, Outlet } from "react-router-dom";

import useCurrentUser from "@/features/auth/hooks/useCurrentUser";

const AdminRoute = () => {
  const {
    data: user,
    isLoading,
  } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;