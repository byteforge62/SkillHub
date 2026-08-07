import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import Card from "@/components/ui/Card";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import OtpInput from "@/components/ui/OtpInput";
import AuthHeader from "@/components/auth/AuthHeader";

import verifyEmailFormSchema from "../validation/verifyEmailFormSchema";
import useVerifyEmail from "../hooks/useVerifyEmail";
import useResendVerification from "../hooks/useResendVerification";

const VerifyEmailForm = () => {
  const location = useLocation()
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
    console.log("Submitted", values);
    console.log("OTP:")

    verifyMutation.mutate(values);
  };

  const handleResend = () => {
    resendMutation.mutate({
      email,
    });
  };

  return (
    <Card className="w-full max-w-md">

      <AuthHeader
        title="Verify Email"
        subtitle="Enter the 6-digit verification code sent to your email."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        <Input
          label="Email"
          disabled
          {...register("email")}
          error={errors.email?.message}
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

        <Button
          type="submit"
          loading={verifyMutation.isPending}
          fullWidth
        >
          Verify Email
        </Button>

      </form>

      <button
        type="button"
        onClick={handleResend}
        className="mt-6 w-full text-sm text-primary hover:underline"
      >
        Resend OTP
      </button>

    </Card>
  );
};

export default VerifyEmailForm;