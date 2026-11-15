import { useNavigate } from "react-router-dom";
import {
  Binary,
  Braces,
  FileText,
  Fingerprint,
  KeyRound,
  Regex,
  ArrowRight,
  Link,
} from "lucide-react";

const iconMap = {
  "json-formatter": Braces,
  "jwt-decoder": KeyRound,
  base64: Binary,
  "url-encoder": Link,
  "uuid-generator": Fingerprint,
  "regex-tester": Regex,
  "markdown-preview": FileText,
};

export const ToolCard = ({ tool }) => {
  const navigate = useNavigate();

  const Icon = iconMap[tool.id] || Braces;

  const handleOpen = () => {
    navigate(`/tools/${tool.id}`);
  };

  return (
    <article className="group rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-embedded">
          <Icon size={24} />
        </div>

        <span className="rounded-full bg-surface-embedded px-3 py-1 text-xs font-medium text-text-secondary">
          {tool.category}
        </span>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold text-text-primary">
          {tool.name}
        </h2>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-text-muted">
          {tool.description}
        </p>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
      >
        Open Tool
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>
    </article>
  );
};
