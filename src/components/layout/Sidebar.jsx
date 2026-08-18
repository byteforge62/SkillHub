import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  User,
} from "lucide-react";

import Logo from "@/components/ui/Logo";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Learning",
    path: "/learning",
    icon: BookOpen,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
];

export const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-surface">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Logo className="text-xl" />
        </div>

        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-1 p-4"
        >
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-4 py-3",
                    "text-sm font-medium transition-colors",
                    "focus:outline-none focus-visible:ring-2",
                    "focus-visible:ring-primary/40",
                    isActive
                      ? "bg-primary text-text-primary"
                      : [
                          "text-text-secondary",
                          "hover:bg-surface-hover",
                          "hover:text-text-primary",
                        ].join(" "),
                  ].join(" ")
                }
              >
                <Icon
                  size={18}
                  aria-hidden="true"
                />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;