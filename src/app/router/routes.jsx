import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

import { LandingPage } from "@/features/home/pages/LandingPage";
import { EventsPage } from "@/features/events/pages/EventsPage";
import { EventDetailsPage } from "@/features/events/pages/EventDetailsPage";
import { EventManagementPage } from "@/features/events/pages/EventManagementPage";
import { CommunitiesPage } from "@/features/community/pages/CommunitiesPage";
import { CommunityDetailPage } from "@/features/community/pages/CommunityDetailPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { MyLearningPage } from "@/features/enrollment/pages/MyLearningPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { UnauthorizedPage } from "@/features/auth/pages/UnauthorizedPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { AdminDashboardPage } from "@/features/admin/pages/AdminDashboardPage";
import { AdminReportsPage } from "@/features/admin/pages/AdminReportsPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage";
import { ToolsPage } from "@/features/tools/pages/ToolsPage";
import { LearningPage } from "@/features/learning/pages/LearningPage";
import { CoursesPage } from "@/features/courses/pages/CoursesPage";
import { CourseDetailsPage } from "@/features/courses/pages/CourseDetailsPage";
import { JsonFormatter } from "@/features/tools/tools/json/JsonFormatter";
import { JwtDecoder } from "@/features/tools/tools/jwt/JwtDecoder";
import { Base64Tool } from "@/features/tools/tools/base64/Base64Tool";
import { UrlEncoder } from "@/features/tools/tools/url/UrlEncoder";
import { UuidGenerator } from "@/features/tools/tools/uuid/UuidGenerator";
import { RegexTester } from "@/features/tools/tools/regex/RegexTester";
import { MarkdownPreviewer } from "@/features/tools/tools/markdown/MarkdownPreviewer";

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
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/events/:eventId",
        element: <EventDetailsPage />,
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
    // USER APP SHELL
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/courses",
          element: <CoursesPage />,
        },
        {
          path: "/courses/:courseId",
          element: <CourseDetailsPage />,
        },
        {
          path: "/learning/:courseId",
          element: <LearningPage />,
        },
        {
          path: "/learning",
          element: <MyLearningPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/communities",
          element: <CommunitiesPage />,
        },
        {
          path: "/communities/:communityId",
          element: <CommunityDetailPage />,
        },
      ],
    },

    // TOOLS
    {
      path: "/tools",
      element: <ToolsPage />,
    },
    {
      path: "/events/manage",
      element: <EventManagementPage />,
    },

    {
      path: "/tools/json-formatter",
      element: <JsonFormatter />,
    },

    {
      path: "/tools/jwt-decoder",
      element: <JwtDecoder />,
    },

    {
      path: "/tools/base64",
      element: <Base64Tool />,
    },

    {
      path: "/tools/url-encoder",
      element: <UrlEncoder />,
    },

    {
      path: "/tools/uuid-generator",
      element: <UuidGenerator />,
    },

    {
      path: "/tools/regex-tester",
      element: <RegexTester />,
    },

    {
      path: "/tools/markdown-preview",
      element: <MarkdownPreviewer />,
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
            {
              path: "reports",
              element: <AdminReportsPage />,
            },
          ],
        },
      ],
    },
  ],
},
]);

export default router;