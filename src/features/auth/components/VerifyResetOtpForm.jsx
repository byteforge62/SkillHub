import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom'
import useVerifyResetOtp from '../hooks/useVerifyResetOtp';
import { zodResolver } from '@hookform/resolvers/zod';
import verifyEmailFormSchema from '../validation/verifyEmailFormSchema';
import Card from '@/components/ui/Card';
import AuthHeader from '@/components/auth/AuthHeader';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import OtpInput from '@/components/ui/OtpInput';

export const VerifyResetOtpForm = () => {
    const location = useLocation();
    const email = location.state?.email || "";
    const verifyResetOtpMutation = useVerifyResetOtp();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(verifyEmailFormSchema),
        defaultValues: {
            email,
            otp: ""
        }
    });

    const onSubmit = (values) => {
        verifyResetOtpMutation.mutate(values);
    }
    return (
        <Card className="w-full max-w-md">
            <AuthHeader
                title="Verify Reset Code"
                subtitle="Enter the 6-digit verification code sent to your email."
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

                <Button
                    type="submit"
                    loading={verifyResetOtpMutation.isPending}
                    fullWidth
                >
                    Verify Code
                </Button>
            </form>
        </Card>
    )
}
