import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

import { LandingPage } from "@/features/home/pages/LandingPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { UnauthorizedPage } from "@/features/auth/pages/UnauthorizedPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { AdminDashboardPage } from "@/features/admin/pages/AdminDashboardPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";
import { VerifyResetOtpPage } from "@/features/auth/pages/VerifyResetOtpPage";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  // PUBLIC
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },

  // AUTH
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/verify-reset-otp",
        element: <VerifyResetOtpPage />,
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
    ],
  },

  // PROTECTED
  {
    element: <ProtectedRoute />,
    children: [
      // USER DASHBOARD
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
        ],
      },

      // ADMIN
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminDashboardPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;