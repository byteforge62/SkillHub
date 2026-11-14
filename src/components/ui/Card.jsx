import clsx from "clsx";

const Card = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg border border-border bg-surface p-6 shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;