import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import AuthFormShell from "@/components/auth/AuthFormShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";

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
    <AuthFormShell
      title="Sign in"
      subtitle="Pick up your courses, progress and communities where you left them."
      footer={
        <>
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[11.5px] text-text-muted">New here?</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Link
            to="/register"
            className="mt-4 flex h-11 w-full items-center justify-center rounded-full border border-[color:var(--color-line)] text-[13.5px] font-semibold text-text-primary transition-colors hover:border-primary/40 hover:bg-sage/60"
          >
            Create an account
          </Link>

          <p className="mt-5 flex items-center justify-center gap-1.5 border-t border-border-subtle pt-4 text-[11.5px] text-text-muted">
            <LockKeyhole size={12} aria-hidden="true" />
            Session tokens are stored securely, never in the URL.
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="mt-2 flex justify-end">
            <Link
              to="/forgot-password"
              className="text-[12.5px] font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
          iconRight={ArrowRight}
          className="!mt-6"
        >
          {loginMutation.isPending ? "Signing in" : "Sign in to SkillHub"}
        </Button>
      </form>
    </AuthFormShell>
  );
};

export default LoginForm;
