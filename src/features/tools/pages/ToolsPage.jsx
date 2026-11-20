import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Binary,
  Braces,
  Code2,
  FileText,
  Fingerprint,
  KeyRound,
  Link2,
  Regex,
  ShieldCheck,
  Terminal,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

import toolRegistry from "../toolRegistry";

const categoryNote = {
  "Developer Tools": "Format, encode and inspect while you build.",
  "Authentication & Security":
    "Look inside tokens and hashes without sending data anywhere.",
  "Programming & Validation": "Test patterns and text before it reaches your code.",
  Documentation: "Turn notes into something readable.",
};

const toolIcons = {
  "json-formatter": Braces,
  "jwt-decoder": KeyRound,
  base64: Binary,
  "url-encoder": Link2,
  "uuid-generator": Fingerprint,
  "regex-tester": Regex,
  "markdown-preview": FileText,
};

const ToolIcon = ({ id }) => {
  const Icon = toolIcons[id] || Code2;

  return <Icon size={15} strokeWidth={1.9} aria-hidden="true" />;
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
    <div>
      <PageHeader
        eyebrow="Practice tools"
        title="Learn it, then take it apart"
        description="Small instruments that run in the browser. Nothing is uploaded — useful when you want to check a token, a pattern or a payload while you study."
        action={
          <Badge variant="outline" size="md" icon={KeyRound}>
            {toolRegistry.length} tools · nothing uploaded
          </Badge>
        }
      />

      <div className="editorial-split mt-7">
        <div className="min-w-0 space-y-8">
          {Object.entries(groupedTools).map(([category, tools]) => (
            <section key={category}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={14}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  <h2 className="section-label">{category}</h2>
                </div>
                <span className="text-[11px] text-text-muted">
                  {tools.length} {tools.length === 1 ? "tool" : "tools"}
                </span>
              </div>

              <div className="overflow-hidden rounded-[16px] border border-line bg-white">
                <div className="divide-y divide-line">
                  {tools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tools/${tool.id}`}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-sage/60"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-sage text-primary">
                        <ToolIcon id={tool.id} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13.5px] font-medium text-text-primary">
                          {tool.name}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-[12px] text-text-secondary">
                          {tool.description}
                        </p>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-primary">
                        Open
                        <ArrowUpRight
                          size={12}
                          className="transition-transform group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <p className="mt-2 text-[11.5px] text-text-muted">
                {categoryNote[category] || "Tools to support your learning workflow."}
              </p>
            </section>
          ))}
        </div>

        <aside className="space-y-5">
          <section className="rounded-[16px] bg-forest-deep px-5 py-5 text-text-on-dark">
            <div className="flex items-center gap-2">
              <Terminal size={15} className="text-[#a9ccb8]" aria-hidden="true" />
              <h2 className="text-[11.5px] font-medium text-text-on-dark-secondary">
                Command palette
              </h2>
            </div>

            <p className="mt-3 text-[13px] leading-[1.55] text-text-on-dark-secondary">
              Every tool is one keystroke from anywhere in the workspace.
            </p>

            <p className="mt-4">
              <kbd className="rounded border border-white/20 bg-white/10 px-2 py-1 font-mono text-[11px] text-white">
                ⌘K
              </kbd>
            </p>
          </section>

          <section className="rounded-[16px] border border-line bg-white px-5 py-5">
            <h2 className="section-label">Full learning path</h2>
            <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary">
              Courses pair these instruments with sections, lessons, quizzes and
              saved progress.
            </p>
            <Button as={Link} to="/courses" size="sm" variant="secondary" className="mt-4">
              Browse courses
            </Button>
          </section>

          <p className="text-[11.5px] leading-[1.6] text-text-muted">
            Input never leaves your browser: these tools parse, format and render
            locally in the page.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default ToolsPage;
