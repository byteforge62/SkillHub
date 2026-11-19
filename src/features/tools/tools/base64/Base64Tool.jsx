import { useState } from "react";
import { ToolPageLayout } from "../../components/ToolPageLayout";
import Button from "@/components/ui/Button";

const SAMPLE_TEXT = "Hello SkillHub 👋";

const encodeBase64 = (text) => {
  const bytes = new TextEncoder().encode(text);

  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

const decodeBase64 = (value) => {
  const binary = atob(value);

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
};

export const Base64Tool = () => {
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
      setError("Please enter some text.");
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(encodeBase64(input));
      } else {
        setOutput(decodeBase64(input.trim()));
      }
    } catch {
      setOutput("");
      setError(
        "Invalid Base64 input. Please provide a valid Base64-encoded value."
      );
    }
  };

  const handleSample = () => {
    if (mode === "encode") {
      setInput(SAMPLE_TEXT);
    } else {
      setInput(encodeBase64(SAMPLE_TEXT));
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
      title="Base64 Encoder / Decoder"
      description="Encode and decode Base64 text quickly in your browser."
      category="Authentication & Security"
      usefulFor={["Base64", "Data Encoding", "Web Development"]}
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

        {/* MAIN */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* INPUT */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="base64-input"
                className="code-field-label"
              >
                {mode === "encode" ? "Text Input" : "Base64 Input"}
              </label>

              <span className="code-field-meta">
                {input.length} characters
              </span>
            </div>

            <textarea
              id="base64-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setOutput("");
                setError("");
                setCopied(false);
              }}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 value to decode..."
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
                htmlFor="base64-output"
                className="code-field-label"
              >
                {mode === "encode" ? "Base64 Output" : "Decoded Text"}
              </label>

              <span className="code-field-meta">
                {output.length} characters
              </span>
            </div>

            <textarea
              id="base64-output"
              value={output}
              readOnly
              placeholder={
                mode === "encode"
                  ? "Encoded Base64 will appear here..."
                  : "Decoded text will appear here..."
              }
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
                  ? "Text successfully encoded."
                  : "Base64 successfully decoded."}
              </div>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="mt-8 rounded-2xl border border-[color:var(--color-line)] bg-sage p-5">
          <h2 className="font-semibold">About Base64</h2>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Base64 is an encoding format that represents binary data using
            ASCII characters. Encoding is not encryption and does not provide
            security or confidentiality.
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
};

