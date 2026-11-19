import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthFormShell from "@/components/auth/AuthFormShell";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";

import registerFormSchema from "../validation/registerFormSchema";
import useRegister from "../hooks/useRegister";

export const RegisterForm = () => {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    registerMutation.mutate(values);
  };

  return (
    <AuthFormShell
      title="Create your account"
      subtitle="One account for courses, tools, workshops and the people learning beside you."
      footer={
        <p className="text-center text-[12.5px] text-text-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="fullname"
          label="Full name"
          placeholder="Ada Lovelace"
          autoComplete="name"
          icon={User}
          error={errors.fullname?.message}
          {...register("fullname")}
        />

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

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          hint="Use at least 8 characters, mixing letters and numbers."
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={registerMutation.isPending}
          disabled={registerMutation.isPending}
          iconRight={ArrowRight}
          className="!mt-6"
        >
          {registerMutation.isPending ? "Creating account" : "Create account"}
        </Button>
      </form>
    </AuthFormShell>
  );
};

export default RegisterForm;
