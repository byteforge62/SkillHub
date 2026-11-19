import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";

const navigation = [
  {
    label: "Resources",
    href: "#resources",
    dropdown: [
      { label: "Explore Resources", href: "#resources" },
      { label: "Study Materials", href: "#resources" },
    ],
  },
  {
    label: "Learning",
    href: "#learning",
    dropdown: [
      { label: "Explore Courses", href: "#learning" },
      { label: "Learning Paths", href: "#learning" },
    ],
  },
  {
    label: "Workspace",
    href: "#workspace",
    dropdown: [
      { label: "My Workspace", href: "#workspace" },
      { label: "Projects", href: "#workspace" },
    ],
  },
  {
    label: "Events",
    href: "#events",
  },
  {
    label: "Tools",
    href: "#tools",
  },
];

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: {
      duration: 0.12,
    },
  },
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const BrandMark = ({ className = "" }) => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="44" height="44" rx="13" fill="#1D604B" />

    <path
      d="M25.9 8.8L17.1 13.9C13.6 16 11.7 19.2 11.7 22.6C11.7 26.1 14 29.2 17.3 30.8L22.1 33.2L27.1 30.3L20.4 26.6C18.8 25.7 17.9 24.3 17.9 22.6C17.9 21 18.9 19.5 20.5 18.5L27.5 14.5L25.9 8.8Z"
      fill="#F7F6EF"
    />

    <path
      d="M18.1 35.1L26.9 30C30.4 27.9 32.3 24.7 32.3 21.3C32.3 17.8 30 14.7 26.7 13.1L21.9 10.7L16.9 13.6L23.6 17.3C25.2 18.2 26.1 19.6 26.1 21.3C26.1 22.9 25.1 24.4 23.5 25.4L16.5 29.4L18.1 35.1Z"
      fill="#C6D8CA"
    />
  </svg>
);

const navLinkClass =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-[#26352F] transition-colors duration-200 hover:bg-[#E8EEE9] hover:text-[#1D604B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D604B]/30";

const dropdownLinkClass =
  "flex items-center rounded-lg px-3 py-2.5 text-sm text-[#34443D] transition-colors hover:bg-[#F0F4F0] hover:text-[#1D604B]";

export const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);

  // Scroll-aware navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus when clicking outside the navbar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileOpen(false);
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const closeNavigation = () => {
    setActiveDropdown(null);
    setIsMobileOpen(false);
  };

  const toggleDropdown = (label) => {
    setActiveDropdown((current) =>
      current === label ? null : label
    );
  };

  const toggleSearch = () => {
    setIsSearchOpen((current) => !current);
    setActiveDropdown(null);
    setIsMobileOpen(false);

    if (isSearchOpen) {
      setSearchQuery("");
    }
  };

  const filteredNavigation = navigation.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    // Navigate to the matching landing-page section if found.
    const matchingItem = navigation.find((item) =>
      item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    if (matchingItem) {
      document.querySelector(matchingItem.href)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      ref={navbarRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          animate={{
            boxShadow: isScrolled
              ? "0 8px 32px rgba(22, 45, 34, 0.09)"
              : "0 2px 12px rgba(22, 45, 34, 0.035)",
          }}
          transition={{ duration: 0.25 }}
          className={`
            relative overflow-visible rounded-full border
            transition-all duration-300
            ${
              isScrolled
                ? "border-white/60 bg-white/95 backdrop-blur-xl"
                : "border-white/60 bg-white/85 backdrop-blur-lg"
            }
          `}
        >
          {/* Main navbar */}
          <div className="flex h-[66px] items-center gap-3 px-4 sm:px-6 lg:px-8">
            {/* Brand */}
            <Link
              to="/"
              onClick={closeNavigation}
              aria-label="SkillHub home"
              className="flex shrink-0 items-center gap-2.5"
            >
              <BrandMark className="h-10 w-10 shrink-0" />

              <Logo className="!text-[23px] !font-bold !tracking-tight !text-[#13251D]" />
            </Link>

            {/* Brand divider */}
            <div
              className="mx-2 hidden h-8 w-px bg-[#D8DED9] sm:block"
              aria-hidden="true"
            />

            {/* Desktop navigation */}
            <nav
              className="ml-1 hidden items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                >
                  {item.dropdown ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="true"
                        onClick={() => toggleDropdown(item.label)}
                        className={navLinkClass}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.label
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute left-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-[#E5EAE5] bg-white p-2 shadow-[0_16px_40px_rgba(20,40,30,0.10)]"
                          >
                            <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#89958D]">
                              {item.label}
                            </div>

                            {item.dropdown.map((dropdownItem) => (
                              <a
                                key={dropdownItem.label}
                                href={dropdownItem.href}
                                onClick={closeNavigation}
                                className={dropdownLinkClass}
                              >
                                {dropdownItem.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={closeNavigation}
                      className={navLinkClass}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop right actions */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              {/* Search */}
              <Button
                variant="tertiary"
                size="sm"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
                onClick={toggleSearch}
                className="!h-10 !w-10 !rounded-full !p-0"
              >
                {isSearchOpen ? (
                  <X size={19} />
                ) : (
                  <Search size={19} />
                )}
              </Button>

              <div
                className="mx-1 hidden h-7 w-px bg-[#D8DED9] sm:block"
                aria-hidden="true"
              />

              {/* Sign in */}
              <Link
                to="/login"
                onClick={closeNavigation}
                className="hidden h-10 items-center justify-center rounded-full border border-[#CFD7D1] px-5 text-sm font-medium text-[#20332A] transition-all duration-200 hover:border-[#1D604B] hover:bg-[#F0F4F0] sm:inline-flex"
              >
                Sign in
              </Link>

              {/* Get started */}
              <Link
                to="/register"
                onClick={closeNavigation}
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-[#1D604B] px-4 sm:px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#164C3B] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D604B]/40"
              >
                <span className="hidden sm:inline">Get started</span>
                <span className="sm:hidden">Join</span>

                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              {/* Mobile menu toggle */}
              <Button
                variant="secondary"
                size="sm"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
                onClick={() => {
                  setIsMobileOpen((current) => !current);
                  setActiveDropdown(null);
                  setIsSearchOpen(false);
                }}
                className="!h-10 !w-10 !rounded-full !p-0 lg:!hidden"
              >
                {isMobileOpen ? <X size={19} /> : <Menu size={19} />}
              </Button>
            </div>
          </div>

          {/* Expandable search */}
          <AnimatePresence initial={false}>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="border-t border-[#E8ECE8] px-4 py-4 sm:px-6">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="mx-auto max-w-2xl"
                  >
                    <Input
                      ref={searchInputRef}
                      id="landing-navbar-search"
                      type="search"
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search navigation..."
                      className="!rounded-full !border-[#DCE3DD] !bg-[#F8FAF8] focus:!border-[#1D604B]"
                    />

                    {searchQuery.trim() && (
                      <div className="mt-2 overflow-hidden rounded-xl border border-[#E5EAE5] bg-white p-1">
                        {filteredNavigation.length > 0 ? (
                          filteredNavigation.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => {
                                closeNavigation();
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center justify-between rounded-lg px-3 py-3 text-sm text-[#34443D] transition-colors hover:bg-[#F0F4F0]"
                            >
                              {item.label}
                              <ArrowRight size={15} />
                            </a>
                          ))
                        ) : (
                          <p className="px-3 py-3 text-sm text-[#8A958D]">
                            No navigation items found.
                          </p>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile navigation */}
          <AnimatePresence initial={false}>
            {isMobileOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden lg:hidden"
              >
                <div className="border-t border-[#E8ECE8] px-4 pb-4 pt-3 sm:px-6">
                  <nav
                    className="flex flex-col gap-1"
                    aria-label="Mobile navigation"
                  >
                    {navigation.map((item) => (
                      <div key={item.label}>
                        {item.dropdown ? (
                          <>
                            <button
                              type="button"
                              onClick={() => toggleDropdown(item.label)}
                              aria-expanded={activeDropdown === item.label}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-[#34443D] transition-colors hover:bg-[#F0F4F0]"
                            >
                              {item.label}
                              <ChevronDown
                                size={16}
                                className={`transition-transform ${
                                  activeDropdown === item.label
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {activeDropdown === item.label && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="ml-3 overflow-hidden border-l border-[#DCE3DD] pl-2"
                                >
                                  {item.dropdown.map((dropdownItem) => (
                                    <a
                                      key={dropdownItem.label}
                                      href={dropdownItem.href}
                                      onClick={closeNavigation}
                                      className="block rounded-lg px-3 py-2.5 text-sm text-[#66746B] hover:bg-[#F0F4F0] hover:text-[#1D604B]"
                                    >
                                      {dropdownItem.label}
                                    </a>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <a
                            href={item.href}
                            onClick={closeNavigation}
                            className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-[#34443D] transition-colors hover:bg-[#F0F4F0]"
                          >
                            {item.label}
                            <ArrowRight
                              size={15}
                              className="text-[#89958D]"
                            />
                          </a>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Mobile authentication actions */}
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#E8ECE8] pt-4">
                    <Link
                      to="/login"
                      onClick={closeNavigation}
                      className="flex h-11 items-center justify-center rounded-full border border-[#CFD7D1] text-sm font-medium text-[#20332A] transition-colors hover:bg-[#F0F4F0]"
                    >
                      Sign in
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeNavigation}
                      className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#1D604B] text-sm font-semibold text-white transition-colors hover:bg-[#164C3B]"
                    >
                      Get started
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
};

export default LandingNavbar;