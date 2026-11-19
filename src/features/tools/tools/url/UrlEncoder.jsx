import { useState } from "react";
import { ToolPageLayout } from "../../components/ToolPageLayout";
import Button from "@/components/ui/Button";

const SAMPLE_TEXT =
  "https://skillhub.example.com/search?q=react fundamentals&sort=latest";

export const UrlEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    setError("");
    setCopied(false);

    if (!input.trim()) {
      setOutput("");
      setError("Please enter a URL or text.");
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput("");
      setError(
        "Unable to decode the value. Make sure the input contains valid URL encoding."
      );
    }
  };

  const handleSample = () => {
    if (mode === "encode") {
      setInput(SAMPLE_TEXT);
    } else {
      setInput(encodeURIComponent(SAMPLE_TEXT));
    }

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

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <ToolPageLayout
      title="URL Encoder / Decoder"
      description="Encode and decode URL components safely directly in your browser."
      category="Developer Tools"
      usefulFor={["URLs", "Query Parameters", "APIs"]}
    >
      <div className="space-y-6">
{/* MODE */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleModeChange("encode")}
            aria-pressed={mode === "encode"}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === "encode"
                ? "bg-primary text-white"
                : "border border-[color:var(--color-line)] hover:bg-surface-hover"
              }`}
          >
            Encode
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("decode")}
            aria-pressed={mode === "decode"}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === "decode"
                ? "bg-primary text-white"
                : "border border-[color:var(--color-line)] hover:bg-surface-hover"
              }`}
          >
            Decode
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* INPUT */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="url-input"
                className="code-field-label"
              >
                {mode === "encode" ? "Text / URL Input" : "Encoded URL Input"}
              </label>

              <span className="code-field-meta">
                {input.length} characters
              </span>
            </div>

            <textarea
              id="url-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setOutput("");
                setError("");
                setCopied(false);
              }}
              placeholder={
                mode === "encode"
                  ? "Enter text or URL to encode..."
                  : "Enter encoded URL to decode..."
              }
              className="code-field min-h-[360px]"
              spellCheck={false}
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={handleProcess}
              >
                {mode === "encode" ? "Encode" : "Decode"}
              </Button>

              <Button
                variant="secondary"
                onClick={handleSample}
              >
                Sample
              </Button>

              <Button
                variant="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* OUTPUT */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="url-output"
                className="code-field-label"
              >
                {mode === "encode" ? "Encoded Output" : "Decoded Output"}
              </label>

              <span className="code-field-meta">
                {output.length} characters
              </span>
            </div>

            <textarea
              id="url-output"
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="code-field min-h-[360px]"
              spellCheck={false}
            />

            <div className="mt-4">
              <Button
                variant="primary"
                onClick={handleCopy}
                disabled={!output}
              >
                {copied ? "Copied!" : "Copy Output"}
              </Button>
            </div>

            {error && (
              <div className="mt-4 rounded-2xl border border-error/20 bg-error/5 p-4 text-sm text-error">
                {error}
              </div>
            )}

            {!error && output && (
              <div className="mt-4 rounded-2xl border border-success/20 bg-success/5 p-4 text-sm text-success">
                {mode === "encode"
                  ? "Value successfully URL encoded."
                  : "Value successfully URL decoded."}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[color:var(--color-line)] bg-sage p-5">
          <h2 className="font-semibold">About URL Encoding</h2>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            URL encoding converts characters that have special meaning in URLs
            into percent-encoded representations. This is commonly used when
            safely placing text inside URL components such as query parameters.
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
};
