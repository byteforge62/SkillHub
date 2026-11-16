import { Toaster } from "sonner";

const ToastProvider = () => {
    return (
        <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
        />
    )
}

export default ToastProvider;