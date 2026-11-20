import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  Users,
  Wrench,
  X,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import Avatar from "@/components/ui/Avatar";
import SearchDialog from "@/components/ui/SearchDialog";
import { cn } from "@/lib/cn";
import { dropdownMotion } from "@/lib/motion";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import useLogout from "@/features/auth/hooks/useLogout";
import toolRegistry from "@/features/tools/toolRegistry";

const menus = {
  Resources: [
    {
      label: "Course catalog",
      description: "Structured courses with lessons and quizzes",
      to: "/courses",
      icon: BookOpen,
    },
    {
      label: "Developer tools",
      description: "Seven browser tools for everyday practice",
      to: "/tools",
      icon: Wrench,
    },
    {
      label: "Communities",
      description: "Learn alongside other SkillHub members",
      to: "/communities",
      icon: Users,
    },
  ],
  Learning: [
    {
      label: "My learning",
      description: "Continue the courses you are enrolled in",
      to: "/learning",
      icon: BookOpen,
    },
    {
      label: "Events & workshops",
      description: "Live sessions hosted by the community",
      to: "/events",
      icon: CalendarDays,
    },
    {
      label: "Dashboard",
      description: "Progress, events and next steps",
      to: "/dashboard",
      icon: LayoutDashboard,
    },
  ],
  Workspace: [
    {
      label: "Workspace",
      description: "Your learning overview and activity",
      to: "/dashboard",
      icon: LayoutGrid,
    },
    {
      label: "Profile",
      description: "Your public profile and links",
      to: "/profile",
      icon: User,
    },
    {
      label: "Settings",
      description: "Preferences, theme and motion",
      to: "/profile/settings",
      icon: Settings,
    },
  ],
};

const primaryLinks = [
  { label: "Events", to: "/events" },
  { label: "Tools", to: "/tools" },
];

const navTriggerClass =
  "relative inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[13.5px] font-medium text-text-secondary transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";

export const SiteHeader = () => {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const headerRef = useRef(null);

  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const isAuthenticated = Boolean(user);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setUserMenuOpen(false);
  };

  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeAll();
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeAll();

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const searchItems = useMemo(
    () => [
      ...Object.values(menus)
        .flat()
        .map((item) => ({ ...item, group: "Pages" })),
      ...primaryLinks.map((item) => ({
        ...item,
        group: "Pages",
        description: "Browse the SkillHub platform",
      })),
      ...toolRegistry.map((tool) => ({
        label: tool.name,
        description: tool.description,
        group: "Tools",
        to: `/tools/${tool.id}`,
        icon: Wrench,
        keywords: [...tool.usefulFor, tool.category],
      })),
    ],
    [],
  );

  const handleLogout = () => {
    closeAll();
    logoutMutation.mutate();
  };

  const isActive = (to) => location.pathname.startsWith(to);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto max-w-[1240px]">
        <motion.div
          animate={{
            boxShadow: scrolled
              ? "0 18px 46px rgba(20, 46, 33, 0.10)"
              : "0 4px 18px rgba(20, 46, 33, 0.045)",
          }}
          transition={{ duration: 0.25 }}
          className={cn(
            "relative rounded-[26px] border backdrop-blur-xl transition-colors duration-300 sm:rounded-full",
            scrolled || mobileOpen || openMenu
              ? "border-[color:var(--color-line)] bg-white/90"
              : "border-white/70 bg-white/75",
          )}
        >
          <div className="flex h-[64px] items-center gap-2 px-3 sm:px-4">
            <Link
              to="/"
              aria-label="SkillHub home"
              onClick={closeAll}
              className="flex shrink-0 items-center rounded-full pr-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <Logo markClassName="h-9 w-9" />
            </Link>

            <span
              className="mx-1 hidden h-6 w-px bg-[color:var(--color-line)] lg:block"
              aria-hidden="true"
            />

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-0.5 lg:flex"
            >
              {Object.entries(menus).map(([label, items]) => (
                <div key={label} className="relative">
                  <button
                    type="button"
                    aria-expanded={openMenu === label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu((current) => (current === label ? null : label))
                    }
                    className={cn(
                      navTriggerClass,
                      openMenu === label && "text-primary",
                    )}
                  >
                    {label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2.2}
                      aria-hidden="true"
                      className={cn(
                        "transition-transform duration-200",
                        openMenu === label && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openMenu === label && (
                      <motion.div
                        variants={dropdownMotion}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-1/2 top-full z-50 mt-2 w-[320px] -translate-x-1/2 overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white p-2 shadow-[0_28px_70px_rgba(18,40,29,0.14)]"
                      >
                        <p className="px-3 pb-1.5 pt-2 text-[11.5px] font-medium text-text-muted">
                          {label}
                        </p>

                        {items.map((item) => {
                          const Icon = item.icon;

                          return (
                            <Link
                              key={item.label}
                              to={item.to}
                              onClick={closeAll}
                              className="group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-sage/70"
                            >
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage text-primary transition-colors group-hover:bg-white">
                                <Icon
                                  size={15}
                                  strokeWidth={1.8}
                                  aria-hidden="true"
                                />
                              </span>

                              <span className="min-w-0">
                                <span className="block text-[13.5px] font-semibold text-text-primary">
                                  {item.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-5 text-text-muted">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {primaryLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeAll}
                  className={cn(
                    navTriggerClass,
                    isActive(link.to) && "text-primary",
                  )}
                >
                  {isActive(link.to) && (
                    <motion.span
                      layoutId="header-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-sage"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search SkillHub"
                className="group flex h-9 items-center gap-2 rounded-[8px] px-2.5 text-text-secondary transition-colors hover:bg-sage hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:border sm:border-[color:var(--color-line)] sm:bg-white/60 sm:pr-2"
              >
                <Search size={17} strokeWidth={1.9} aria-hidden="true" />
                <span className="hidden text-[12.5px] font-medium xl:block">
                  Search
                </span>
                <kbd className="hidden rounded-md border border-[color:var(--color-line)] bg-white px-1.5 py-0.5 text-[10px] font-medium text-text-muted xl:block">
                  Ctrl K
                </kbd>
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    aria-label="Workspace"
                    className="hidden h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-sage hover:text-primary sm:flex"
                  >
                    <LayoutGrid size={17} strokeWidth={1.9} aria-hidden="true" />
                  </Link>

                  <Link
                    to="/dashboard"
                    aria-label="Notifications"
                    className="relative hidden h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-sage hover:text-primary sm:flex"
                  >
                    <Bell size={17} strokeWidth={1.9} aria-hidden="true" />
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  </Link>

                  <div className="relative ml-1">
                    <button
                      type="button"
                      onClick={() => setUserMenuOpen((current) => !current)}
                      aria-expanded={userMenuOpen}
                      aria-haspopup="true"
                      aria-label="Account menu"
                      className="flex items-center gap-1 rounded-[10px] p-0.5 transition-colors hover:bg-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    >
                      <Avatar
                        src={user?.avatar}
                        name={user?.fullname}
                        email={user?.email}
                        size="sm"
                      />
                      <ChevronDown
                        size={13}
                        className="mr-0.5 text-text-muted"
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          variants={dropdownMotion}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute right-0 top-full z-50 mt-3 w-[248px] overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white p-2 shadow-[0_28px_70px_rgba(18,40,29,0.16)]"
                        >
                          <div className="px-3 pb-2 pt-2">
                            <p className="truncate text-sm font-semibold text-text-primary">
                              {user?.fullname || "SkillHub member"}
                            </p>
                            <p className="truncate text-xs text-text-muted">
                              {user?.email}
                            </p>
                          </div>

                          <div className="h-px bg-border-subtle" />

                          {[
                            {
                              label: "Workspace",
                              to: "/dashboard",
                              icon: LayoutDashboard,
                            },
                            {
                              label: "My learning",
                              to: "/learning",
                              icon: BookOpen,
                            },
                            { label: "Profile", to: "/profile", icon: User },
                            {
                              label: "Settings",
                              to: "/profile/settings",
                              icon: Settings,
                            },
                          ].map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={closeAll}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-medium text-text-secondary transition-colors hover:bg-sage/70 hover:text-primary"
                            >
                              <item.icon
                                size={15}
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                              {item.label}
                            </Link>
                          ))}

                          <div className="my-1 h-px bg-border-subtle" />

                          <button
                            type="button"
                            onClick={handleLogout}
                            disabled={logoutMutation.isPending}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13.5px] font-medium text-text-secondary transition-colors hover:bg-error-soft hover:text-error disabled:opacity-60"
                          >
                            <LogOut
                              size={15}
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                            {logoutMutation.isPending
                              ? "Signing out..."
                              : "Sign out"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeAll}
                    className="hidden h-9 items-center justify-center rounded-full px-4 text-[13.5px] font-medium text-text-secondary transition-colors hover:bg-sage hover:text-text-primary sm:inline-flex"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeAll}
                    className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-primary-hover"
                  >
                    <span className="hidden sm:inline">Get started</span>
                    <span className="sm:hidden">Join</span>
                    <ArrowRight
                      size={14}
                      strokeWidth={2.2}
                      className={cn(
                        "transition-transform",
                        !prefersReduced && "group-hover:translate-x-0.5",
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileOpen((current) => !current);
                  setOpenMenu(null);
                  setUserMenuOpen(false);
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="ml-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-line)] bg-white/70 text-text-primary transition-colors hover:bg-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 lg:hidden"
              >
                {mobileOpen ? (
                  <X size={17} aria-hidden="true" />
                ) : (
                  <Menu size={17} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: prefersReduced ? 0 : 0.24 }}
                className="overflow-hidden lg:hidden"
              >
                <nav
                  aria-label="Mobile navigation"
                  className="border-t border-border-subtle px-3 pb-3 pt-2"
                >
                  {Object.entries(menus).map(([label, items]) => (
                    <div key={label} className="py-1">
                      <p className="px-2 py-1 text-[11.5px] font-medium text-text-muted">
                        {label}
                      </p>
                      {items.map((item) => (
                        <Link
                          key={label + item.to + item.label}
                          to={item.to}
                          onClick={closeAll}
                          className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-[13.5px] font-medium text-text-secondary hover:bg-sage/70 hover:text-primary"
                        >
                          <item.icon
                            size={15}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}

                  <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border-subtle pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        setSearchOpen(true);
                      }}
                      className="flex h-10 items-center justify-center gap-2 rounded-full border border-[color:var(--color-line)] text-[13px] font-medium text-text-primary"
                    >
                      <Search size={15} aria-hidden="true" />
                      Search
                    </button>

                    {isAuthenticated ? (
                      <Link
                        to="/dashboard"
                        onClick={closeAll}
                        className="flex h-10 items-center justify-center gap-2 rounded-full bg-primary text-[13px] font-semibold text-white"
                      >
                        Workspace
                      </Link>
                    ) : (
                      <Link
                        to="/register"
                        onClick={closeAll}
                        className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary text-[13px] font-semibold text-white"
                      >
                        Get started
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    )}
                  </div>

                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      onClick={closeAll}
                      className="mt-2 flex h-10 items-center justify-center rounded-full border border-[color:var(--color-line)] text-[13px] font-medium text-text-primary"
                    >
                      Sign in
                    </Link>
                  )}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={searchItems}
      />
    </header>
  );
};

export default SiteHeader;
