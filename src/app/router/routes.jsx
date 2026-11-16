import { createHashRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { ProfileEdit } from "@/features/profile/pages/ProfileEdit";

const router = createHashRouter([
  {
    path: "/",
    element: <div>Landing</div>,
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
