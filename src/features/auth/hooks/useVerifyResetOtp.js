import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { verifyResetOtpRequest } from "../api/authApi";

const useVerifyResetOtp = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: verifyResetOtpRequest,

        onSuccess: ({message,data}) => {
            toast.success(message);

            navigate("/reset-password",{
                state:{
                    email: data.email
                }
            })
        },

        onError: (error) => {
            toast.error(error.response?.data?.message ?? "Invalid verification code.");
        }
    })
}

export default useVerifyResetOtp;