import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { resendVerificationRequest } from "../api/authApi";

const useResendVerification = () => {
    return useMutation({
        mutationFn: ({message}) => {
            toast.success(message);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ?? "Unable to resend OTP."
            )
        }
    })
}

export default useResendVerification;