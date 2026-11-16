import Logo from "@/components/ui/Logo";

const AuthHeader = ({ title, subtitle }) => {
  return (
    <header className="mb-8 text-center">
      <Logo />

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-text-primary">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-text-secondary">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default AuthHeader;