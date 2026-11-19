import { Link, Outlet } from "react-router-dom";
import {
  ArrowLeft,
  BookOpenCheck,
  Compass,
  MessagesSquare,
  Wrench,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import Badge from "@/components/ui/Badge";

const valueProps = [
  {
    icon: BookOpenCheck,
    title: "Courses that keep their shape",
    description: "Sections, lessons, resources and quizzes in one workspace.",
  },
  {
    icon: Compass,
    title: "Progress you can see",
    description: "Pick up exactly where you stopped, on any device.",
  },
  {
    icon: MessagesSquare,
    title: "A community, not a comment section",
    description: "Discuss the work with people learning the same things.",
  },
];

export const AuthLayout = () => (
  <div className="min-h-screen bg-background lg:grid lg:grid-cols-[1.02fr_1fr]">
    <aside className="relative isolate flex flex-col overflow-hidden bg-forest-deep px-6 py-8 text-text-on-dark sm:px-10 lg:min-h-screen lg:px-14 lg:py-10 xl:px-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,239,234,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(232,239,234,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[22%] top-[-12%] h-[560px] w-[560px] rounded-full border border-white/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[10%] top-[4%] h-[380px] w-[380px] rounded-full border border-white/[0.08]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-[-10%] h-[420px] w-[420px] rounded-full bg-[#2f6c53]/35 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between">
        <Link
          to="/"
          aria-label="SkillHub home"
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Logo tone="light" />
        </Link>

        <Link
          to="/"
          className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-text-on-dark-secondary transition-colors hover:border-white/35 hover:text-white sm:inline-flex"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Back to site
        </Link>
      </div>

      <div className="relative z-10 my-auto max-w-[520px] py-12 lg:py-16">
        <Badge
          variant="glass"
          className="!border-white/15 !bg-white/[0.07] !text-text-on-dark-secondary"
          dot
        >
          Learn, build, grow
        </Badge>

        <h1 className="mt-7 text-[clamp(2.1rem,4.1vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.045em] text-text-on-dark">
          A learning workspace
          <span className="block text-[#a9ccb8]">that respects your time.</span>
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-7 text-text-on-dark-secondary">
          SkillHub brings courses, practice tools and the people learning
          alongside you into one calm place.
        </p>

        <ul className="mt-9 space-y-5">
          {valueProps.map((prop) => (
            <li key={prop.title} className="flex gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[#a9ccb8] ring-1 ring-white/10">
                <prop.icon size={16} strokeWidth={1.7} aria-hidden="true" />
              </span>

              <span>
                <span className="block text-[13.5px] font-semibold text-text-on-dark">
                  {prop.title}
                </span>
                <span className="mt-0.5 block max-w-sm text-[13px] leading-6 text-text-on-dark-muted">
                  {prop.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 hidden items-center justify-between border-t border-white/10 pt-5 lg:flex">
        <p className="text-xs text-text-on-dark-muted">
          Built for people who learn by making.
        </p>

        <span className="inline-flex items-center gap-2 text-xs text-text-on-dark-muted">
          <Wrench size={13} aria-hidden="true" />
          Seven tools included
        </span>
      </div>
    </aside>

    <section className="relative flex min-h-[70vh] flex-col px-5 py-8 sm:px-8 lg:min-h-screen lg:px-12 lg:py-10 xl:px-16">
      <div
        className="pointer-events-none absolute inset-0 sage-mesh opacity-70"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between lg:justify-end">
        <Link
          to="/"
          aria-label="SkillHub home"
          className="rounded-full lg:hidden"
        >
          <Logo />
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[13px] font-medium text-text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to home
        </Link>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-[460px]">
          <Outlet />
        </div>
      </div>

      <footer className="relative z-10 flex items-center justify-center border-t border-[color:var(--color-line)] pt-5">
        <p className="text-[11.5px] text-text-muted">
          © {new Date().getFullYear()} SkillHub
        </p>
      </footer>
    </section>
  </div>
);

export default AuthLayout;
