import { Navigate, Outlet, useLocation } from "react-router-dom";

import useCurrentUser from "@/features/auth/hooks/useCurrentUser";

const ProtectedRoute = () => {
  const location = useLocation();

  const {
    data: user,
    isLoading,
  } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;