import { Link } from "react-router-dom";
import {
  ArrowRight,
  Binary,
  Braces,
  FileText,
  Fingerprint,
  KeyRound,
  Link2,
  Regex,
} from "lucide-react";

const iconMap = {
  "json-formatter": Braces,
  "jwt-decoder": KeyRound,
  base64: Binary,
  "url-encoder": Link2,
  "uuid-generator": Fingerprint,
  "regex-tester": Regex,
  "markdown-preview": FileText,
};

export const ToolCard = ({ tool }) => {
  const Icon = iconMap[tool.id] || Braces;

  return (
    <Link
      to={`/tools/${tool.id}`}
      className="group flex h-full flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-hover)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage text-primary">
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
        </span>

        <span className="rounded-full border border-[color:var(--color-line)] px-2.5 py-1 text-[10.5px] font-medium text-text-muted">
          {tool.category}
        </span>
      </div>

      <h2 className="mt-5 text-[16px] font-bold tracking-[-0.025em] text-text-primary">
        {tool.name}
      </h2>

      <p className="mt-2 flex-1 text-[13px] leading-6 text-text-secondary">
        {tool.description}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-primary">
        Open tool
        <ArrowRight
          size={13}
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
};

export default ToolCard;
