import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";

import AuthFormShell from "@/components/auth/AuthFormShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import OtpInput from "@/components/ui/OtpInput";

import verifyEmailFormSchema from "../validation/verifyEmailFormSchema";
import useVerifyResetOtp from "../hooks/useVerifyResetOtp";

export const VerifyResetOtpForm = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const verifyResetOtpMutation = useVerifyResetOtp();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const onSubmit = (values) => {
    verifyResetOtpMutation.mutate(values);
  };

  return (
    <AuthFormShell
      title="Confirm the reset code"
      subtitle="Enter the six-digit code from your email to continue to a new password."
      footer={
        <p className="text-center text-[12px] leading-5 text-text-muted">
          Codes expire shortly after they are sent. You can request a new one
          from the reset page.
        </p>
      }
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

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={verifyResetOtpMutation.isPending}
          disabled={verifyResetOtpMutation.isPending}
          iconLeft={ShieldCheck}
        >
          {verifyResetOtpMutation.isPending ? "Verifying" : "Verify code"}
        </Button>
      </form>
    </AuthFormShell>
  );
};

export default VerifyResetOtpForm;
