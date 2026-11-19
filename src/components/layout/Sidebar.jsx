import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Settings,
  User,
  Users,
  Wrench,
  X,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

const groups = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, end: true },
      { label: "My learning", to: "/learning", icon: BookOpen },
      { label: "Courses", to: "/courses", icon: GraduationCap },
    ],
  },
  {
    label: "Discover",
    items: [
      { label: "Communities", to: "/communities", icon: Users },
      { label: "Events", to: "/events", icon: CalendarDays },
      { label: "Tools", to: "/tools", icon: Wrench },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", to: "/profile", icon: User, end: true },
      { label: "Settings", to: "/profile/settings", icon: Settings },
    ],
  },
];

export const Sidebar = ({ open = false, onClose }) => (
  <>
    {open && (
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#0f221a]/30 backdrop-blur-[2px] lg:hidden"
      />
    )}

    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-[272px] p-3 transition-transform duration-300 ease-out lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[color:var(--color-line)] bg-white shadow-[0_18px_46px_rgba(20,46,33,0.08)]">
        <div className="flex h-[68px] shrink-0 items-center justify-between px-5">
          <Link
            to="/"
            aria-label="SkillHub home"
            className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <Logo markClassName="h-8 w-8" />
          </Link>

          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-sage hover:text-primary lg:hidden"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Workspace navigation"
          className="flex-1 overflow-y-auto px-3 pb-2"
        >
          {groups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-3 pb-1.5 pt-1 text-[11px] font-medium text-text-muted">
                {group.label}
              </p>

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "group relative flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                          isActive
                            ? "text-white"
                            : "text-text-secondary hover:bg-sage/60 hover:text-primary",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.span
                              layoutId="sidebar-active"
                              className="absolute inset-0 -z-10 rounded-2xl bg-primary"
                              transition={{ type: "spring", stiffness: 320, damping: 30 }}
                            />
                          )}

                          <Icon
                            size={16}
                            strokeWidth={1.9}
                            aria-hidden="true"
                            className={isActive ? "text-white" : "text-text-muted"}
                          />

                          {item.label}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 p-3">
          <Link
            to="/tools"
            onClick={onClose}
            className="group block rounded-2xl bg-sage p-3.5 transition-colors hover:bg-sage-soft"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-primary">
                Practice while you learn
              </span>
              <ArrowUpRight
                size={13}
                className="text-primary transition-transform group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>

            <p className="mt-1 text-[12px] leading-5 text-text-secondary">
              Seven browser tools, open to everyone.
            </p>
          </Link>

          <Link
            to="/"
            onClick={onClose}
            className="mt-2 flex items-center justify-between rounded-2xl px-3 py-2 text-[12px] font-medium text-text-muted transition-colors hover:bg-sage/60 hover:text-primary"
          >
            Back to public site
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  </>
);

export default Sidebar;
