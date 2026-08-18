import clsx from "clsx";

const Card = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-border bg-surface p-8 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;