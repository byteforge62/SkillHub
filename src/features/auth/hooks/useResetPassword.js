import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { resetPasswordRequest } from "../api/authApi";

const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPasswordRequest,

    onSuccess: ({message}) => {
        toast.success(message);
        navigate("/login");
    },

    onError: (error) => {
        toast.error(error.response?.data?.message ?? "unable to reset password.")
    }
  })
}

export default useResetPassword;