import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import AuthFormShell from "@/components/auth/AuthFormShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import forgotPasswordFormSchema from "../validation/forgotPasswordFormSchema";
import useForgotPassword from "../hooks/useForgotPassword";

export const ForgotPasswordForm = () => {
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    forgotPasswordMutation.mutate(values);
  };

  return (
    <AuthFormShell
      title="Reset your password"
      subtitle="Enter the email on your account. We'll send a six-digit code to confirm it's you."
      footer={
        <p className="text-center text-[12.5px] text-text-secondary">
          Remembered it?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Back to sign in
          </Link>
        </p>
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

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={forgotPasswordMutation.isPending}
          disabled={forgotPasswordMutation.isPending}
          iconRight={ArrowRight}
          className="!mt-6"
        >
          {forgotPasswordMutation.isPending
            ? "Sending code"
            : "Send verification code"}
        </Button>
      </form>
    </AuthFormShell>
  );
};

export default ForgotPasswordForm;
