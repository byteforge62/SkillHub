import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { logoutRequest } from "../api/authApi";
import { clearAccessToken } from "../utils/tokenManager";

const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutRequest,

        onSuccess: (response) => {
            clearAccessToken();
            queryClient.removeQueries({
                queryKey:["current-user"],
            });

            toast.success(response.message || "Logged out successfully.");
            navigate("/login",{replace: true});
        },

        onError: (error) => {
            clearAccessToken();
            queryClient.removeQueries({
                queryKey:["current-user"],
            });
            toast.error(error.response?.data?.message || "Logout failed.Please try again.");
            navigate("/login", {replace: true});
        }
    })
}

export default useLogout;