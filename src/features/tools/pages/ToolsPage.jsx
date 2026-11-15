import { useMemo } from "react";
import {
    Wrench,
    Code2,
    ShieldCheck,
    Brackets,
    FileText,
} from "lucide-react";

import toolRegistry from "../toolRegistry";
import { ToolCard } from "../components/ToolCard";

const categoryIcons = {
    "Developer Tools": Code2,
    "Authentication & Security": ShieldCheck,
    "Programming & Validation": Brackets,
    Documentation: FileText,
};

export const ToolsPage = () => {
    const groupedTools = useMemo(() => {
        return toolRegistry.reduce((groups, tool) => {
            if (!groups[tool.category]) {
                groups[tool.category] = [];
            }

            groups[tool.category].push(tool);

            return groups;
        }, {});
    }, []);

    return (
        <main className="min-h-screen bg-background px-6 py-10 text-text-primary">
            {/* Hero */}
            <section className="relative overflow-hidden pb-12 pt-16">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface-embedded px-4 py-2 text-sm font-medium text-text-secondary">
                            <Wrench size={16} />
                            SkillHub Learning Tools
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Learn it.
                            <span className="block">
                                Practice it with the right tools.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-text-muted sm:text-lg">
                            Practical developer tools designed to help you
                            experiment with concepts you learn throughout
                            SkillHub.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tool Categories */}
            <section className="mt-12 pb-16">
                <div className="mx-auto max-w-6xl space-y-14">
                    {Object.entries(groupedTools).map(
                        ([category, tools]) => {
                            const CategoryIcon =
                                categoryIcons[category] || Wrench;

                            return (
                                <section key={category}>
                                    {/* Category heading */}
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-embedded">
                                            <CategoryIcon size={20} />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-bold">
                                                {category}
                                            </h2>

                                            <p className="text-sm text-text-muted">
                                                Tools to support your learning
                                                and development workflow.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tools */}
                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        {tools.map((tool) => (
                                            <ToolCard
                                                key={tool.id}
                                                tool={tool}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        }
                    )}
                </div>
            </section>
        </main>
    );
};

