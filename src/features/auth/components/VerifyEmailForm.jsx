import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";

import AuthFormShell from "@/components/auth/AuthFormShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import OtpInput from "@/components/ui/OtpInput";

import verifyEmailFormSchema from "../validation/verifyEmailFormSchema";
import useVerifyEmail from "../hooks/useVerifyEmail";
import useResendVerification from "../hooks/useResendVerification";

const VerifyEmailForm = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  const verifyMutation = useVerifyEmail();
  const resendMutation = useResendVerification();

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
    verifyMutation.mutate(values);
  };

  const handleResend = () => {
    resendMutation.mutate({ email });
  };

  return (
    <AuthFormShell
      title="Verify your email"
      subtitle="We sent a six-digit code. Enter it below to activate your account."
      footer={
        <div className="flex flex-col items-center gap-2 border-t border-border-subtle pt-4">
          <p className="text-[12.5px] text-text-muted">
            Didn't get the code? Check spam, or send another.
          </p>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            loading={resendMutation.isPending}
            disabled={resendMutation.isPending || !email}
            onClick={handleResend}
          >
            Resend code
          </Button>
        </div>
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
            Verification code
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
          loading={verifyMutation.isPending}
          disabled={verifyMutation.isPending}
          iconLeft={ShieldCheck}
        >
          {verifyMutation.isPending ? "Verifying" : "Verify email"}
        </Button>
      </form>
    </AuthFormShell>
  );
};

export default VerifyEmailForm;
