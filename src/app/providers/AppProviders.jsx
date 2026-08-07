import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

const AppProviders = ({children}) => {
    return (
        <QueryProvider>
            <ThemeProvider>
                {children}
                <ToastProvider/>
            </ThemeProvider>
        </QueryProvider>
    )
}

export default AppProviders;