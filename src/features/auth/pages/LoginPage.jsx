import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  FolderOpen,
  Users,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F4F2E9] text-[#17221C">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT — Editorial learning panel */}
        <section className="relative flex min-h-[440px] flex-col overflow-hidden bg-[#E8EBDD] px-6 py-7 sm:px-10 lg:min-h-screen lg:px-14 lg:py-10 xl:px-20">

          {/* Atmospheric background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5EC] via-[#E9EBDD] to-[#DCE4D8" />

            <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#D5DFD0]/70 blur-3xl" />

            <div className="absolute -right-52 top-[-100px] h-[650px] w-[650px] rounded-full border border-[#B8C5B5]/30" />

            <div className="absolute -right-32 top-[-50px] h-[480px] w-[480px] rounded-full border border-[#B8C5B5]/30" />

            <div className="absolute bottom-[-160px] left-[20%] h-[450px] w-[450px] rounded-full bg-[#C7D2C2]/50 blur-3xl" />

            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#849781]/15" />
          </div>

          {/* Brand */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center">
              <Logo className="text-3xl font-bold tracking-tight text-[#123D30]" />
            </Link>
          </div>

          {/* Editorial content */}
          <div className="relative z-10 my-auto max-w-xl py-14 lg:py-20">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C7D2C2]/70 bg-white/50 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#276451]" />

              <span className="text-sm font-medium tracking-wide text-[#285442]">
                Learn · Build · Grow
              </span>
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#14221B] sm:text-5xl lg:text-[54px] xl:text-[64px]">
              <span className="text-[#23634D]">Welcome</span>
              <br />
              back.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[#626A63] sm:text-lg sm:leading-8">
              Sign in to continue your learning journey and make progress toward what matters to you.
            </p>

            {/* Learning benefits */}
            <div className="mt-9 space-y-4 sm:mt-11">
              {[
                {
                  icon: BookOpen,
                  label: "Access your courses",
                },
                {
                  icon: FolderOpen,
                  label: "Track your progress",
                },
                {
                  icon: Users,
                  label: "Join the community",
                },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3.5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCE5D8]/80 text-[#225C47]">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-medium text-[#29463A] sm:text-base">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 hidden items-center gap-4 border-t border-[#C5CEC0]/70 pt-5 lg:flex">
            <span className="h-px w-12 bg-[#64816F]" />

            <p className="text-sm text-[#536456]">
              Learn at your own pace.
            </p>
          </div>
        </section>

        {/* RIGHT — Authentication panel */}
        <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#F8F7F1] px-5 py-6 sm:px-8 sm:py-9 lg:px-10 xl:px-16">

          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-44 -top-44 h-[560px] w-[560px] rounded-full border border-[#E4E2D8]" />

            <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#E8E9DD]/60" />

            <div className="absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full bg-[#E5E9DE]/50 blur-3xl" />
          </div>

          {/* Top navigation */}
          <div className="relative z-10 flex justify-end">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md py-2 text-sm font-medium text-[#285442] transition-colors hover:text-[#163B2E]"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>

          {/* Form positioning */}
          <div className="relative z-10 flex flex-1 items-center justify-center py-8 sm:py-12">
            <div className="w-full max-w-[470px]">
              <LoginForm />
            </div>
          </div>

          {/* Bottom footer */}
          <footer className="relative z-10 flex items-center justify-center border-t border-[#E5E3DB] pt-5">
            <p className="text-xs tracking-wide text-[#93948B]">
              © {new Date().getFullYear()} SkillHub
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;