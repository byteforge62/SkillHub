import { ArrowLeft, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export const ToolPageLayout = ({
    title,
    description,
    category,
    usefulFor = [],
    children,
}) => {
    return (
        <main className="min-h-screen bg-background px-6 py-8 text-text-primary">
            <div className="mx-auto max-w-6xl">
                {/* Back */}
                <Link
                    to="/tools"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
                >
                    <ArrowLeft size={16} />
                    Back to Tools
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-embedded px-3 py-1.5 text-xs font-semibold text-text-secondary">
                        <Wrench size={14} />
                        {category}
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {title}
                    </h1>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-text-muted">
                        {description}
                    </p>

                    {usefulFor.length > 0 && (
                        <div className="mt-5">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                                Useful for
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {usefulFor.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full bg-surface-embedded px-3 py-1.5 text-xs font-medium text-text-secondary"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Tool */}
                <section>{children}</section>
            </div>
        </main>
    );
};

