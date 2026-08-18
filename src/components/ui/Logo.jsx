import clsx from "clsx";

const Logo = ({ className }) => {
  return (
    <span
      className={clsx(
        "text-3xl font-bold tracking-tight",
        className
      )}
    >
      SkillHub
    </span>
  );
};

export default Logo;