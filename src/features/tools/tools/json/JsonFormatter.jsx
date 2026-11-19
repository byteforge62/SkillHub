import { useState } from "react";
import { ToolPageLayout } from "../../components/ToolPageLayout";
import Button from "@/components/ui/Button";

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
      <div className="space-y-6">
<div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="json-input"
                className="code-field-label"
              >
                Input JSON
              </label>

              <span className="code-field-meta">
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
              className="code-field min-h-[420px]"
              spellCheck={false}
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="primary" onClick={handleFormat}>
  Format
</Button>

              <Button variant="secondary" onClick={handleMinify}>
  Minify
</Button>

              <Button variant="secondary" onClick={handleSample}>
  Sample
</Button>

              <Button variant="secondary" onClick={handleClear}>
  Clear
</Button>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="json-output"
                className="code-field-label"
              >
                Output
              </label>

              <span className="code-field-meta">
                {output.length} characters
              </span>
            </div>

            <textarea
              id="json-output"
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="code-field min-h-[420px]"
              spellCheck={false}
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="primary" onClick={handleCopy}>
  {copied ? "Copied!" : "Copy Output"}
</Button>

              <Button variant="secondary" onClick={handleSwap}>
  Use Output as Input
</Button>
            </div>

            {error && (
              <div className="mt-4 rounded-full border border-error/20 bg-error/5 p-3 text-sm text-error">
                {error}
              </div>
            )}

            {!error && output && (
              <div className="mt-4 rounded-full border border-success/20 bg-success/5 p-3 text-sm text-success">
                Valid JSON
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

