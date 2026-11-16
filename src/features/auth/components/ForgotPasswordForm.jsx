import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthHeader from "@/components/auth/AuthHeader";

import forgotPasswordFormSchema from "../validation/forgotPasswordFormSchema";
import useForgotPassword from "../hooks/useForgotPassword";


export const ForgotPasswordForm = () => {
  const forgotPasswordMutation = useForgotPassword();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = (values) => {
    forgotPasswordMutation.mutate(values);
  };

  return (
    <Card className="w-full max-w-md">
      <AuthHeader
        title="Forgot Password"
        subtitle="Enter your email address and we'll send you a verification code."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          loading={forgotPasswordMutation.isPending}
          fullWidth
        >
          Send Verification Code
        </Button>
      </form>
    </Card>
  )
}
