import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { verifyEmailRequest } from "../api/authApi";

const useVerifyEmail = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: verifyEmailRequest,

        onSuccess: ({message}) => {
            toast.success(message);
            navigate("/login")
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ?? "Verification failed"
            )
        }
    }) 
}

export default useVerifyEmail;