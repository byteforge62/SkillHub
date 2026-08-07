import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Card from '@/components/ui/Card'
import Logo from '@/components/ui/Logo'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import Button from '@/components/ui/Button'

import registerFormSchema from '../validation/registerFormSchema'
import useRegister from '../hooks/useRegister'


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
    }
  });

  const onSubmit = (values) => {
    registerMutation.mutate(values);
  }
  return (
    <Card className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Logo />

        <h2 className="mt-6 text-3xl font-bold">
          Create Account
        </h2>

        <p className="mt-2 text-text-secondary">
          Join SkillHub and Start Your Learning Journey.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="fullname"
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.fullname?.message}
          {...register("fullname")}
        />

        <Input
          id="email"
          label="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          loading={registerMutation.isPending}
          fullWidth
        >
          Create Account
        </Button>
      </form>
    </Card>
  )
}

export default RegisterForm;
