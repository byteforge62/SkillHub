import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Braces,
  Code2,
  FileText,
  Fingerprint,
  KeyRound,
  Regex,
  ShieldCheck,
  Binary,
  Link2,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import toolRegistry from "../toolRegistry";

const categoryMeta = {
  "Developer Tools": {
    icon: Code2,
    note: "Format, encode and inspect while you build.",
  },
  "Authentication & Security": {
    icon: ShieldCheck,
    note: "Look inside tokens and hashes without sending data anywhere.",
  },
  "Programming & Validation": {
    icon: Braces,
    note: "Test patterns and text before it reaches your code.",
  },
  Documentation: {
    icon: FileText,
    note: "Turn notes into something readable.",
  },
};

export const ToolsPage = () => {
  const groupedTools = useMemo(
    () =>
      toolRegistry.reduce((groups, tool) => {
        if (!groups[tool.category]) groups[tool.category] = [];
        groups[tool.category].push(tool);
        return groups;
      }, {}),
    [],
  );

  return (
    <main>
      <section className="sage-mesh relative overflow-hidden border-b border-[color:var(--color-line)]">
        <div className="architectural-grid absolute inset-0" aria-hidden="true" />

        <div className="container-wide relative py-14 sm:py-20">
          <p className="text-eyebrow uppercase tracking-[0.14em]">Practice tools</p>

          <h1 className="display-2 mt-4 max-w-3xl">
            Learn it, then take it apart.
          </h1>

          <p className="text-lead mt-5 max-w-2xl">
            Seven small tools that run in the browser. Nothing is uploaded — useful
            when you want to check a token, a pattern or a payload while you study.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <Badge variant="outline" size="md" icon={KeyRound}>
              {toolRegistry.length} tools
            </Badge>
            <Badge variant="outline" size="md" icon={Fingerprint}>
              No sign-in required
            </Badge>
          </div>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-16">
        <div className="space-y-12">
          {Object.entries(groupedTools).map(([category, tools]) => {
            const meta = categoryMeta[category] || {};
            const CategoryIcon = meta.icon || Code2;

            return (
              <div key={category}>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage text-primary">
                    <CategoryIcon size={18} strokeWidth={1.9} aria-hidden="true" />
                  </span>

                  <div>
                    <h2 className="text-[19px] font-bold tracking-[-0.03em]">{category}</h2>
                    <p className="mt-1 text-[13px] text-text-muted">
                      {meta.note || "Tools to support your learning workflow."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tools/${tool.id}`}
                      className="group flex h-full flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-hover)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sage text-primary">
                          <ToolIcon id={tool.id} />
                        </span>

                        <ArrowRight
                          size={15}
                          className="mt-1 text-text-muted transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.02em] text-text-primary">
                        {tool.name}
                      </h3>

                      <p className="mt-1.5 flex-1 text-[12.5px] leading-6 text-text-secondary">
                        {tool.description}
                      </p>

                      <span className="mt-3 text-[11.5px] font-semibold text-primary">
                        Open tool
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Card variant="forest" className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[17px] font-bold tracking-[-0.03em] text-text-on-dark">
              Want the full learning path?
            </h2>
            <p className="mt-1.5 max-w-xl text-[13px] leading-6 text-text-on-dark-secondary">
              Courses pair these ideas with sections, lessons, quizzes and saved
              progress.
            </p>
          </div>

          <Button as={Link} to="/courses" variant="onDark" iconRight={ArrowRight}>
            Browse courses
          </Button>
        </Card>
      </section>
    </main>
  );
};

const toolIcons = {
  "json-formatter": Braces,
  "jwt-decoder": KeyRound,
  "base64": Binary,
  "url-encoder": Link2,
  "uuid-generator": Fingerprint,
  "regex-tester": Regex,
  "markdown-preview": FileText,
};

const ToolIcon = ({ id }) => {
  const Icon = toolIcons[id] || Code2;

  return <Icon size={17} strokeWidth={1.9} aria-hidden="true" />;
};

export default ToolsPage;
