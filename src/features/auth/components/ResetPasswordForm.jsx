import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";

import AuthFormShell from "@/components/auth/AuthFormShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import OtpInput from "@/components/ui/OtpInput";
import PasswordInput from "@/components/ui/PasswordInput";

import resetPasswordFormSchema from "../validation/resetPasswordFormSchema";
import useResetPassword from "../hooks/useResetPassword";

const ResetPasswordForm = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const resetPasswordMutation = useResetPassword();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email,
      otp: "",
      newPassword: "",
    },
  });

  const onSubmit = (values) => {
    resetPasswordMutation.mutate(values);
  };

  return (
    <AuthFormShell
      title="Choose a new password"
      subtitle="Enter the code from your email, then set a password you haven't used before."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          id="email"
          label="Email address"
          disabled
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <p className="mb-2 text-[13px] font-medium text-text-secondary">
            Reset code
          </p>

          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors.otp)}
              />
            )}
          />

          {errors.otp?.message && (
            <p className="mt-2 text-[12.5px] text-error" role="alert">
              {errors.otp.message}
            </p>
          )}
        </div>

        <PasswordInput
          id="newPassword"
          label="New password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={resetPasswordMutation.isPending}
          disabled={resetPasswordMutation.isPending}
          iconLeft={KeyRound}
        >
          {resetPasswordMutation.isPending ? "Updating" : "Set new password"}
        </Button>
      </form>
    </AuthFormShell>
  );
};

export default ResetPasswordForm;
