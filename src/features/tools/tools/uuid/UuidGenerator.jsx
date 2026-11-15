import { useState } from "react";
import { ToolPageLayout } from "../../components/ToolPageLayout";

const UUID_COUNT = 5;

export const UuidGenerator = () => {
  const [uuids, setUuids] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateUUID = () => {
    return crypto.randomUUID();
  };

  const handleGenerate = () => {
    const generated = Array.from(
      { length: UUID_COUNT },
      generateUUID
    );

    setUuids(generated);
    setCopiedIndex(null);
  };

  const handleCopy = async (uuid, index) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch {
      // Ignore clipboard errors.
    }
  };

  const handleCopyAll = async () => {
    if (!uuids.length) return;

    try {
      await navigator.clipboard.writeText(uuids.join("\n"));

      setCopiedIndex("all");

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch {
      // Ignore clipboard errors.
    }
  };

  const handleClear = () => {
    setUuids([]);
    setCopiedIndex(null);
  };

  return (
    <ToolPageLayout
      title="UUID Generator"
      description="Generate unique UUIDs for development and testing."
      category="Developer Tools"
      usefulFor={["UUID", "Databases", "Backend Development"]}
    >
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            UUID Generator
          </h1>

          <p className="mt-2 text-text-muted">
            Generate unique UUID v4 identifiers instantly in your browser.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            Generate UUIDs
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            disabled={!uuids.length}
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-embedded disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copiedIndex === "all" ? "Copied!" : "Copy All"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={!uuids.length}
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-embedded disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear
          </button>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Generated UUIDs</h2>

            <span className="text-sm text-text-muted">
              {uuids.length} generated
            </span>
          </div>

          {uuids.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-text-muted">
              Click "Generate UUIDs" to create unique identifiers.
            </div>
          ) : (
            <div className="space-y-3">
              {uuids.map((uuid, index) => (
                <div
                  key={uuid}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface-embedded p-3"
                >
                  <span className="w-8 text-sm text-text-muted">
                    {index + 1}.
                  </span>

                  <code className="min-w-0 flex-1 break-all font-mono text-sm">
                    {uuid}
                  </code>

                  <button
                    type="button"
                    onClick={() => handleCopy(uuid, index)}
                    className="shrink-0 rounded-md border border-border px-3 py-2 text-xs font-semibold transition hover:bg-surface"
                  >
                    {copiedIndex === index ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-surface-embedded p-5">
          <h2 className="font-semibold">About UUIDs</h2>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            UUIDs are commonly used to identify records, resources, sessions,
            files, and other entities where a highly unique identifier is
            useful.
          </p>

          <div className="mt-4 rounded-md bg-surface p-3 font-mono text-sm">
            Example: 550e8400-e29b-41d4-a716-446655440000
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};


