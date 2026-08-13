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

        onSuccess: ({ data, message }) => {
            console.log("LOGIN RESPONSE DATA:", data);
            console.log("LOGIN USER:", data.user);

            setAccessToken(data.accessToken);

            queryClient.setQueryData(
                ["current-user"],
                data.user
            );

            console.log(
                "CACHE AFTER LOGIN:",
                queryClient.getQueryData(["current-user"])
            );

            toast.success(message);

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message || "Unable to login.Please try again.",
            );
        },
    });
}

export default useLogin;