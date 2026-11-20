import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
  Users,
  Wrench,
} from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import SearchDialog from "@/components/ui/SearchDialog";
import { dropdownMotion } from "@/lib/motion";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import useLogout from "@/features/auth/hooks/useLogout";
import useMyEnrollments from "@/features/enrollment/hooks/useEnrollment";
import { getEvents } from "@/features/events/api/eventsApi";
import toolRegistry from "@/features/tools/toolRegistry";
import { useQuery } from "@tanstack/react-query";
import { formatEventDate } from "@/features/events/utils/eventDate";

const titles = {
  "/dashboard": "Workspace",
  "/learning": "My learning",
  "/courses": "Course catalog",
  "/communities": "Communities",
  "/events": "Events",
  "/events/manage": "Manage events",
  "/tools": "Developer tools",
  "/profile": "Profile",
  "/profile/edit": "Edit profile",
  "/profile/settings": "Settings",
};

const titleFor = (pathname) => {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/courses/")) return "Course";
  if (pathname.startsWith("/learning/")) return "Lesson workspace";
  if (pathname.startsWith("/events/")) return "Event";
  if (pathname.startsWith("/tools/")) return "Tool";
  if (pathname.startsWith("/communities/")) return "Community";
  return "Workspace";
};

export const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchItems = useMemo(
    () => [
      { label: "Dashboard", to: "/dashboard", group: "Pages", description: "Your learning overview", icon: BookOpen },
      { label: "My learning", to: "/learning", group: "Pages", description: "Enrolled courses", icon: GraduationCap },
      { label: "Course catalog", to: "/courses", group: "Pages", description: "Browse all courses", icon: Sparkles },
      { label: "Communities", to: "/communities", group: "Pages", description: "Discussion rooms", icon: Users },
      { label: "Events", to: "/events", group: "Pages", description: "Upcoming workshops", icon: CalendarDays },
      { label: "Profile", to: "/profile", group: "Pages", description: "Your public profile", icon: User },
      { label: "Settings", to: "/profile/settings", group: "Pages", description: "Preferences", icon: Settings },
      ...toolRegistry.map((tool) => ({
        label: tool.name,
        to: `/tools/${tool.id}`,
        group: "Tools",
        description: tool.description,
        icon: Wrench,
      })),
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-[60px] max-w-[1200px] items-center gap-3 rounded-full border border-[color:var(--color-line)] bg-white/80 px-3 shadow-[0_6px_22px_rgba(20,46,33,0.05)] backdrop-blur-xl sm:px-4">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-sage hover:text-primary lg:hidden"
        >
          <Menu size={18} aria-hidden="true" />
        </button>

        <div className="min-w-0">
          <p className="text-[10.5px] font-medium text-text-muted">SkillHub</p>
          <p className="truncate text-[13.5px] font-semibold tracking-[-0.02em] text-text-primary">
            {titleFor(location.pathname)}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-sage hover:text-primary"
          >
            <Search size={17} strokeWidth={1.9} aria-hidden="true" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-label="Account menu"
              className="flex items-center gap-1.5 rounded-full p-0.5 pl-1.5 transition-colors hover:bg-sage"
            >
              <span className="hidden max-w-[140px] truncate text-[12.5px] font-medium text-text-secondary sm:block">
                {user?.fullname || "Member"}
              </span>

              <Avatar
                src={user?.avatar}
                name={user?.fullname}
                email={user?.email}
                size="sm"
              />

              <ChevronDown size={13} className="mr-0.5 text-text-muted" aria-hidden="true" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  variants={dropdownMotion}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-full z-50 mt-3 w-[232px] overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white p-2 shadow-[0_28px_70px_rgba(18,40,29,0.16)]"
                >
                  <div className="px-3 pb-2 pt-2">
                    <p className="truncate text-[13px] font-semibold text-text-primary">
                      {user?.fullname || "SkillHub member"}
                    </p>
                    <p className="truncate text-[11.5px] text-text-muted">
                      {user?.email}
                    </p>
                  </div>

                  <div className="h-px bg-border-subtle" />

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-text-secondary hover:bg-sage/70 hover:text-primary"
                  >
                    <User size={15} aria-hidden="true" />
                    Profile
                  </Link>

                  <Link
                    to="/profile/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-text-secondary hover:bg-sage/70 hover:text-primary"
                  >
                    <Settings size={15} aria-hidden="true" />
                    Settings
                  </Link>

                  <div className="my-1 h-px bg-border-subtle" />

                  <button
                    type="button"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13px] font-medium text-text-secondary transition-colors hover:bg-error-soft hover:text-error disabled:opacity-60"
                  >
                    <LogOut size={15} aria-hidden="true" />
                    {logoutMutation.isPending ? "Signing out..." : "Sign out"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={searchItems}
      />
    </header>
  );
};

export default Header;



