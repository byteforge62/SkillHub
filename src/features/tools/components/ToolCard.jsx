import { useNavigate } from "react-router-dom";
import {
  Binary,
  Braces,
  FileText,
  Fingerprint,
  KeyRound,
  Regex,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  "json-formatter": Braces,
  "jwt-decoder": KeyRound,
  base64: Binary,
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
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <Icon size={24} />
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {tool.category}
        </span>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold text-gray-900">
          {tool.name}
        </h2>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
          {tool.description}
        </p>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-gray-600"
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
