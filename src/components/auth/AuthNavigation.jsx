import { Link } from "react-router-dom";

const AuthNavigation = ({prompt,label,to}) => {
  return (
    <p className="mt-6 text-center text-sm text-text-secondary">
      {prompt}{" "}
      <Link
        to={to}
        className="font-medium text-primary transition-colors hover:text-primary-hover"
      >
        {label}
      </Link>
    </p>
  );
};

export default AuthNavigation;