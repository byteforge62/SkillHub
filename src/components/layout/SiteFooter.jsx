import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import Logo from "@/components/ui/Logo";
import Badge from "@/components/ui/Badge";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "Course catalog", to: "/courses" },
      { label: "My learning", to: "/learning" },
      { label: "Communities", to: "/communities" },
      { label: "Events & workshops", to: "/events" },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "All tools", to: "/tools" },
      { label: "JSON formatter", to: "/tools/json-formatter" },
      { label: "Regex tester", to: "/tools/regex-tester" },
      { label: "JWT decoder", to: "/tools/jwt-decoder" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Workspace", to: "/dashboard" },
      { label: "Profile", to: "/profile" },
      { label: "Sign in", to: "/login" },
      { label: "Create account", to: "/register" },
    ],
  },
];

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-text-on-dark">
      <div
        className="pointer-events-none absolute inset-0 architectural-grid opacity-[0.12]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#2f6c53]/30 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-wide relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1.6fr] lg:gap-20">
          <div>
            <Link
              to="/"
              aria-label="SkillHub home"
              className="inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Logo tone="light" />
            </Link>

            <p className="mt-6 max-w-sm text-[15px] leading-7 text-text-on-dark-secondary">
              A calmer place to learn technical skills: real courses, working
              tools, and a community that answers back.
            </p>

            <div className="mt-7">
              <Badge
                variant="glass"
                className="!border-white/15 !bg-white/[0.07] !text-text-on-dark-secondary"
                dot
              >
                Learn, build, and grow in one place
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[13px] font-semibold text-text-on-dark">
                  {column.title}
                </h2>

                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1 text-[13.5px] text-text-on-dark-muted transition-colors hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={13}
                          aria-hidden="true"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-on-dark-muted">
            © {year} SkillHub. Built for people who learn by making.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-on-dark-muted">
            <Link to="/courses" className="transition-colors hover:text-white">
              Courses
            </Link>
            <Link to="/tools" className="transition-colors hover:text-white">
              Tools
            </Link>
            <Link to="/events" className="transition-colors hover:text-white">
              Events
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
