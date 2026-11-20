import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";

import { loginRequest } from "@/features/auth/api/authApi";
import { setAccessToken, initializeAccessToken } from "@/features/auth/utils/tokenManager";
import { getDefaultHome } from "@/features/profile/api/profileApi";

const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Initialize from localStorage on every login
    initializeAccessToken();

    return useMutation({
        mutationFn: loginRequest,

        onSuccess: async ({ data, message }) => {
            setAccessToken(data.accessToken);

            queryClient.setQueryData(
                ["current-user"],
                data.user
            );

            toast.success(message);

            if (data.user.role === "admin") {
                navigate("/admin");
                return;
            }

            // Respect the account's configured landing page without blocking
            // on a slow settings request.
            const defaultHome = await getDefaultHome(data.user._id);
            const target = ["learning", "courses", "studio"].includes(defaultHome)
                ? `/${defaultHome}`
                : "/dashboard";

            navigate(target);
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message || "Unable to login.Please try again.",
            );
        },
    });
}

export default useLogin;