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
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { fadeUp, stagger } from "@/lib/motion";
import toolRegistry from "@/features/tools/toolRegistry";

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

    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: open ? 0 : -280 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-[272px] p-3 transition-transform duration-300 ease-out lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white/80 backdrop-blur-md shadow-[0_18px_46px_rgba(20,46,33,0.08)]">
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
          <motion.div variants={stagger(0.05, 0.06)} initial="hidden" animate="visible">
            {groups.map((group, groupIndex) => (
              <motion.div
                key={group.label}
                variants={fadeUp}
                className="mb-5"
              >
                <p className="px-3 pb-1.5 pt-1 text-[11px] font-medium text-text-muted">
                  {group.label}
                </p>

                <div className="space-y-0.5">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: groupIndex * 0.05 + itemIndex * 0.03 }}
                      >
                        <NavLink
                          to={item.to}
                          end={item.end}
                          onClick={onClose}
                          className={({ isActive }) =>
                            cn(
                              "group relative flex items-center gap-2.5 rounded-full px-3 py-2.5 text-[13px] font-medium transition-colors",
                              isActive
                                ? "text-white shadow-[0_4px_14px_rgba(30,86,63,0.3)]"
                                : "text-text-secondary hover:bg-sage/60 hover:text-primary hover:-translate-x-0.5",
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              {isActive && (
                                <motion.span
                                  layoutId="sidebar-active"
                                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                                />
                              )}

                              <Icon
                                size={16}
                                strokeWidth={1.9}
                                aria-hidden="true"
                                className={cn(
                                  "transition-colors",
                                  isActive ? "text-white" : "text-text-muted",
                                )}
                              />

                              {item.label}
                            </>
                          )}
                        </NavLink>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </nav>

        <div className="shrink-0 p-3 space-y-2">
          <Link
            to="/tools"
            onClick={onClose}
            className="group block rounded-2xl bg-sage p-3.5 transition-colors hover:bg-sage-soft hover:shadow-[0_8px_24px_rgba(20,46,33,0.12)] hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-primary">
                Practice while you learn
              </span>
              <Badge variant="glass" size="sm" className="shrink-0">
                {toolRegistry.length} tools
              </Badge>
            </div>

            <p className="mt-1 text-[12px] leading-5 text-text-secondary">
              Browser-based utilities, open to everyone.
            </p>
          </Link>

          <Link
            to="/"
            onClick={onClose}
            className="group flex items-center justify-between rounded-2xl px-3 py-2 text-[12px] font-medium text-text-muted transition-colors hover:bg-sage/60 hover:text-primary hover:-translate-x-0.5"
          >
            Back to public site
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.aside>
  </>
);

export default Sidebar;
