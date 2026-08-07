import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { forgotPasswordRequest } from "../api/authApi";

const useForgotPassword = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: forgotPasswordRequest,
        
        onSuccess: ({message,data}) => {
            toast.success(message);
            navigate("/verify-reset-otp", {
                state:{
                    email: data.email
                }
            })
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ?? "Unable to send reset OTP."
            )
        }
    })
}

export default useForgotPassword;