import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import Card from "@/components/ui/Card";
import Logo from "@/components/ui/Logo";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";

import loginFormSchema from "../validation/loginFormSchema";
import useLogin from "../hooks/useLogin";

export const LoginForm = () => {
  const loginMutation = useLogin();

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (values) => {
    console.log("Form Values:", values);

    console.log("Before mutate");

    loginMutation.mutate(values);

    console.log("After mutate");
  };
  return (
    <Card className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Logo />
        <h2 className="mt-6 text-3xl font-bold">
          Welcome Back
        </h2>
        <p className="mt-2 text-text-secondary">
          Sign in to continue learning.
        </p>
      </div>
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

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          loading={loginMutation.isPending}
          fullWidth
        >
          Sign In
        </Button>
      </form>
    </Card>
  )
}

export default LoginForm;