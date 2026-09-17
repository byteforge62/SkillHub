import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Wrench,
    Code2,
    ShieldCheck,
    Brackets,
    FileText,
} from "lucide-react";

import toolRegistry from "../toolRegistry";

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
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden px-6 pb-12 pt-16">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                            <Wrench size={16} />
                            SkillHub Learning Tools
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Learn it.
                            <span className="block">
                                Practice it with the right tools.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                            Practical developer tools designed to help you
                            experiment with concepts you learn throughout
                            SkillHub.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tool Categories */}
            <section className="px-6 pb-20">
                <div className="mx-auto max-w-6xl space-y-14">
                    {Object.entries(groupedTools).map(
                        ([category, tools]) => {
                            const CategoryIcon =
                                categoryIcons[category] || Wrench;

                            return (
                                <section key={category}>
                                    {/* Category heading */}
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                            <CategoryIcon size={20} />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-bold">
                                                {category}
                                            </h2>

                                            <p className="text-sm text-gray-500">
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

const ToolCard = ({ tool }) => {
    return (
        <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            {/* Icon */}
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                <Wrench size={21} />
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-lg font-bold">
                    {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    {tool.description}
                </p>

                {/* Useful for */}
                <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Useful for
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {tool.usefulFor?.map((item) => (
                            <span
                                key={item}
                                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action */}
            <Link
                to={`/tools/${tool.id}`}
                className="mt-6 inline-flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
            >
                Open Tool

                <ArrowRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                />
            </Link>
        </article>
    );
};

