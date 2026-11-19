import { createHashRouter, Link } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import { LandingPage } from "@/features/home/pages/LandingPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { VerifyResetOtpPage } from "@/features/auth/pages/VerifyResetOtpPage";
import { UnauthorizedPage } from "@/features/auth/pages/UnauthorizedPage";

import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { CoursesPage } from "@/features/courses/pages/CoursesPage";
import { CourseDetailsPage } from "@/features/courses/pages/CourseDetailsPage";
import { MyLearningPage } from "@/features/enrollment/pages/MyLearningPage";
import { LearningPage } from "@/features/learning/pages/LearningPage";

import { ToolsPage } from "@/features/tools/pages/ToolsPage";
import { ToolRoute } from "@/features/tools/toolRoutes";

import { EventsPage } from "@/features/events/pages/EventsPage";
import { EventDetailsPage } from "@/features/events/pages/EventDetailsPage";
import { EventManagementPage } from "@/features/events/pages/EventManagementPage";

import { CommunitiesPage } from "@/features/community/pages/CommunitiesPage";
import { CommunityDetailPage } from "@/features/community/pages/CommunityDetailPage";

import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { ProfileEdit } from "@/features/profile/pages/ProfileEdit";
import { ProfileSettings } from "@/features/profile/pages/ProfileSettings";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Compass } from "lucide-react";

const NotFoundPage = () => (
  <div className="container-narrow py-32">
    <EmptyState
      icon={Compass}
      title="This page doesn't exist"
      description="The address may have changed. Start from the landing page or jump back into your workspace."
      action={
        <div className="flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/">
            Back to SkillHub
          </Button>
          <Button as={Link} to="/dashboard" variant="secondary">
            Go to workspace
          </Button>
        </div>
      }
    />
  </div>
);

const router = createHashRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/tools", element: <ToolsPage /> },
      { path: "/tools/:toolId", element: <ToolRoute /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/events/:eventId", element: <EventDetailsPage /> },
      { path: "/communities", element: <CommunitiesPage /> },
      { path: "/communities/:communityId", element: <CommunityDetailPage /> },
      { path: "/unauthorized", element: <UnauthorizedPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/verify-email", element: <VerifyEmailPage /> },
      { path: "/verify-reset-otp", element: <VerifyResetOtpPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/courses", element: <CoursesPage /> },
          { path: "/courses/:courseId", element: <CourseDetailsPage /> },
          { path: "/learning", element: <MyLearningPage /> },
          { path: "/events/manage", element: <EventManagementPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/profile/edit", element: <ProfileEdit /> },
          { path: "/profile/settings", element: <ProfileSettings /> },
        ],
      },
      { path: "/learning/:courseId", element: <LearningPage /> },
    ],
  },
  {
    path: "*",
    element: <PublicLayout />,
    children: [{ path: "*", element: <NotFoundPage /> }],
  },
]);

export default router;
