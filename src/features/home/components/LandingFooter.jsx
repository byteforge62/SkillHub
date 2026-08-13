import { Link } from "react-router-dom";


export const LandingFooter = () => {
    return (
        <footer>
            <div className="mx-auto max-w-7xl px-6 py-20">
                <div className="flex flex-col gap-10 border-b border-border pb-16 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                            Ready when you are
                        </p>

                        <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight">
                            Enter the workspace and start learning.
                        </h2>
                    </div>

                    <Link
                        to="/register"
                        className="inline-flex w-fit rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                        Enter SkillHub →
                    </Link>
                </div>

                <div className="flex flex-col gap-4 pt-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
                    <span>© {new Date().getFullYear()} SkillHub</span>

                    <span className="font-mono text-xs">
                        BUILD / LEARN / SHARE
                    </span>
                </div>
            </div>
        </footer>
    )
}
