import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

const AppProviders = ({children}) => {
  if (typeof window !== "undefined") {
    const animationsEnabled = localStorage.getItem("animationsEnabled");
    if (animationsEnabled !== null) {
      document.documentElement.setAttribute("data-animations", animationsEnabled);
    }
    const compactMode = localStorage.getItem("compactMode");
    if (compactMode !== null) {
      document.documentElement.setAttribute("data-compact", compactMode);
    }
  }

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