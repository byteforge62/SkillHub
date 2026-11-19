import { cn } from "@/lib/cn";

/**
 * The single form surface for sign in, register and recovery flows.
 * Keeps the card, heading rhythm and footer slot identical across pages.
 */
export const AuthFormShell = ({
  title,
  subtitle,
  children,
  footer,
  className,
}) => (
  <div
    className={cn(
      "rounded-[28px] border border-[color:var(--color-line)] bg-white/90 p-6 shadow-[0_30px_80px_rgba(20,46,33,0.10)] backdrop-blur-xl sm:p-8",
      className,
    )}
  >
    <header>
      <h1 className="text-[26px] font-bold leading-tight tracking-[-0.035em] text-text-primary sm:text-[28px]">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-[13.5px] leading-6 text-text-secondary">
          {subtitle}
        </p>
      )}
    </header>

    <div className="mt-7">{children}</div>

    {footer && <div className="mt-6">{footer}</div>}
  </div>
);

export default AuthFormShell;
