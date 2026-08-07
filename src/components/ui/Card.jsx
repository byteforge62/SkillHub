import clsx from "clsx";

const Card = ({children,className}) => {
  return (
    <div className={clsx("rounded-2xl border border-border bg-surface p-8 shadow-lg",className)}>
      {children}
    </div>
  );
};

export default Card;