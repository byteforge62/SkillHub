import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

import Card from "@/components/ui/Card";
import Logo from "@/components/ui/Logo";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import AuthNavigation from "@/components/auth/AuthNavigation";

import loginFormSchema from "../validation/loginFormSchema";
import useLogin from "../hooks/useLogin";

export const LoginForm = () => {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <Card
      className="
        !rounded-[28px]
        !border-[#E8E5DC]
        !bg-white/70
        !p-6
        !shadow-[0_20px_70px_rgba(34,52,40,0.07)]
        backdrop-blur-xl
        sm:!p-9
        lg:!p-10
      "
    >
      {/* Brand */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center"
          aria-label="SkillHub home"
        >
          <Logo className="text-2xl font-bold tracking-tight text-[#18513D]" />
        </Link>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[#171B18] sm:text-[36px]">
          Sign in
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#777970] sm:text-base">
          Enter your credentials to access your account.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
          className="!h-12 !rounded-xl !border-[#DCDAD1] !bg-[#FAF9F5] focus:!border-[#28634D]"
        />

        <div>
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
            className="!h-12 !rounded-xl !border-[#DCDAD1] !bg-[#FAF9F5] focus:!border-[#28634D]"
          />

          <div className="mt-2 flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#28634D] transition-colors hover:text-[#163D2E]"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
          fullWidth
          className="
            !mt-7
            !h-12
            !rounded-xl
            !bg-[#205C47]
            !text-white
            !shadow-[0_4px_12px_rgba(32,92,71,0.15)]
            hover:!bg-[#174A38]
            active:!scale-[0.99]
          "
        >
          <span className="flex items-center justify-center gap-2">
            Sign in to SkillHub

            {!loginMutation.isPending && (
              <ArrowRight size={17} />
            )}
          </span>
        </Button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#E5E3DC]" />

        <span className="text-xs text-[#98988F]">
          or
        </span>

        <div className="h-px flex-1 bg-[#E5E3DC]" />
      </div>

      {/* Register */}
      <div className="text-center">
        <AuthNavigation
          prompt="New to SkillHub?"
          label="Create an account"
          to="/register"
        />
      </div>

      {/* Security note */}
      <div className="mt-7 flex items-center justify-center gap-2 border-t border-[#EAE8E1] pt-5 text-[#8A8D84]">
        <LockKeyhole size={14} />

        <span className="text-xs">
          Your account is securely protected.
        </span>
      </div>
    </Card>
  );
};

export default LoginForm;