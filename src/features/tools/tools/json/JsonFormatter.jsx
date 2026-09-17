import { useState } from "react";
import { ToolPageLayout } from "../../components/ToolPageLayout";

const SAMPLE_JSON = {
  name: "SkillHub",
  version: 1,
  features: ["courses", "quizzes", "resources"],
  settings: {
    theme: "dark",
    notifications: true,
  },
};

export const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const parseInput = () => {
    if (!input.trim()) {
      setError("Please enter some JSON.");
      setOutput("");
      return null;
    }

    try {
      return JSON.parse(input);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput("");
      return null;
    }
  };

  const handleFormat = () => {
    setError("");
    setCopied(false);

    const parsed = parseInput();

    if (parsed === null) {
      return;
    }

    setOutput(JSON.stringify(parsed, null, 2));
  };

  const handleMinify = () => {
    setError("");
    setCopied(false);

    const parsed = parseInput();

    if (parsed === null) {
      return;
    }

    setOutput(JSON.stringify(parsed));
  };

  const handleSample = () => {
    setInput(JSON.stringify(SAMPLE_JSON, null, 2));
    setOutput("");
    setError("");
    setCopied(false);
  };

  const handleSwap = () => {
    if (!output) {
      return;
    }

    setInput(output);
    setOutput("");
    setError("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the output.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Format, validate, and inspect JSON data."
      category="Developer Tools"
      usefulFor={["REST APIs", "JSON", "API Responses"]}
    >
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">JSON Formatter</h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            Format, validate, and minify JSON directly in your browser.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="json-input"
                className="text-sm font-semibold"
              >
                Input JSON
              </label>

              <span className="text-xs text-gray-400">
                {input.length} characters
              </span>
            </div>

            <textarea
              id="json-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
                setCopied(false);
              }}
              placeholder='{"name":"SkillHub","type":"learning-platform"}'
              className="min-h-[420px] w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-gray-400"
              spellCheck={false}
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleFormat}
                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80"
              >
                Format
              </button>

              <button
                type="button"
                onClick={handleMinify}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
              >
                Minify
              </button>

              <button
                type="button"
                onClick={handleSample}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
              >
                Sample
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="json-output"
                className="text-sm font-semibold"
              >
                Output
              </label>

              <span className="text-xs text-gray-400">
                {output.length} characters
              </span>
            </div>

            <textarea
              id="json-output"
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="min-h-[420px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm outline-none"
              spellCheck={false}
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? "Copied!" : "Copy Output"}
              </button>

              <button
                type="button"
                onClick={handleSwap}
                disabled={!output}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Use Output as Input
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {!error && output && (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                Valid JSON
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};
