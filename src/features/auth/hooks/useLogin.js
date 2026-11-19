import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";

import { loginRequest } from "@/features/auth/api/authApi";
import { setAccessToken } from "@/features/auth/utils/tokenManager";

const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginRequest,

        onSuccess: (response) => {
            // Backend returns: { token, data: user, message }
            const { token, data: user, message } = response;
            
            setAccessToken(token);

            queryClient.setQueryData(
                ["current-user"],
                user
            );

            toast.success(message);

            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message || "Unable to login. Please try again.",
            );
        },
    });
}

export default useLogin;