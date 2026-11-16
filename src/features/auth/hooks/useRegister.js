import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { registerRequest } from "../api/authApi";

const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: registerRequest,

        onSuccess: ({message,data}) => {
            toast.success(message);

            navigate("/verify-email",{
                state:{
                    email: data.email,
                }
            })
        },

        onError:(error) => {
            toast.error(
                error.response?.data?.message ?? "Unable to register."
            )
        }
    });
}

export default useRegister;