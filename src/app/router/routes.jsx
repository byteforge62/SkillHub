import { createHashRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { ProfileEdit } from "@/features/profile/pages/ProfileEdit";
import { LandingPage } from "@/features/home/pages/LandingPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { VerifyResetOtpPage } from "@/features/auth/pages/VerifyResetOtpPage";
import { UnauthorizedPage } from "@/features/auth/pages/UnauthorizedPage";
import { EventsPage } from "@/features/events/pages/EventsPage";
import { EventDetailsPage } from "@/features/events/pages/EventDetailsPage";
import { EventManagementPage } from "@/features/events/pages/EventManagementPage";

const router = createHashRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
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
  {
    path: "/events",
    element: <EventsPage />,
  },
  {
    path: "/events/:eventId",
    element: <EventDetailsPage />,
  },
  {
    path: "/events/manage",
    element: <EventManagementPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <div>Dashboard</div>,
      },
    ],
  },
  {
    path: "/profile",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
      {
        path: "edit",
        element: <ProfileEdit />,
      },
      {
        path: "settings",
        element: <div>Settings (to be implemented)</div>,
      },
    ],
  },
  {
    path: "/learning",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <div>My Learning</div>,
      },
    ],
  },
  {
    path: "/courses",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <div>Courses</div>,
      },
    ],
  },
  {
    path: "/communities",
    element: <div>Communities</div>,
  },
]);

export default router;
