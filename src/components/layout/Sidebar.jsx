import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  User,
  X,
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

export const Sidebar = ({open = false,onClose,}) => {
  return (
    <>
      {/* Mobile backdrop */}

      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-64",
          "border-r border-border bg-surface",
          "transition-transform duration-200 ease-out",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}

          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <Logo className="text-xl" />

            <button
              type="button"
              aria-label="Close navigation"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary md:hidden"
            >
              <X
                size={18}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Navigation */}

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
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-4 py-3",
                      "text-sm font-medium transition-colors",
                      "focus:outline-none focus-visible:ring-2",
                      "focus-visible:ring-primary/40",

                      isActive
                        ? "bg-primary text-white"
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
    </>
  );
};

