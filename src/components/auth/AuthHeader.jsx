import Logo from "../ui/Logo";

const AuthHeader = ({
    title,
    subtitle,
}) => {
    return (
        <div className="mb-8 text-center">
            <Logo />
            <h2 className="mt-6 text-3xl font-bold">
                {title}
            </h2>
            <p className="mt-2 text-text-secondary">
                {subtitle}
            </p>
        </div>
    )
}

export default AuthHeader;