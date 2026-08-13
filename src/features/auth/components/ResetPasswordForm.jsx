import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import OtpInput from "@/components/ui/OtpInput";
import AuthHeader from "@/components/auth/AuthHeader";

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
    <Card className="w-full max-w-md">
      <AuthHeader
        title="Reset Password"
        subtitle="Create a new password for your account."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Email"
          disabled
          error={errors.email?.message}
          {...register("email")}
        />

        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <Button
          type="submit"
          loading={resetPasswordMutation.isPending}
          fullWidth
        >
          Reset Password
        </Button>
      </form>
    </Card>
  );
};

export default ResetPasswordForm;