import { useState } from "react";

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
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">URL Encoder / Decoder</h1>

        <p className="mt-2 max-w-2xl text-gray-500">
          Encode or decode URL components safely in your browser.
        </p>
      </div>

      {/* MODE */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleModeChange("encode")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === "encode"
              ? "bg-black text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Encode
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("decode")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === "decode"
              ? "bg-black text-white"
              : "border border-gray-300 hover:bg-gray-50"
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
              className="text-sm font-semibold"
            >
              {mode === "encode" ? "Text / URL Input" : "Encoded URL Input"}
            </label>

            <span className="text-xs text-gray-400">
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
            className="min-h-[360px] w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-gray-400"
            spellCheck={false}
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleProcess}
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80"
            >
              {mode === "encode" ? "Encode" : "Decode"}
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

        {/* OUTPUT */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="url-output"
              className="text-sm font-semibold"
            >
              {mode === "encode" ? "Encoded Output" : "Decoded Output"}
            </label>

            <span className="text-xs text-gray-400">
              {output.length} characters
            </span>
          </div>

          <textarea
            id="url-output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="min-h-[360px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm outline-none"
            spellCheck={false}
          />

          <div className="mt-4">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output}
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? "Copied!" : "Copy Output"}
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!error && output && (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {mode === "encode"
                ? "Value successfully URL encoded."
                : "Value successfully URL decoded."}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
        <h2 className="font-semibold">About URL Encoding</h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          URL encoding converts characters that have special meaning in URLs
          into percent-encoded representations. This is commonly used when
          safely placing text inside URL components such as query parameters.
        </p>
      </div>
    </div>
  );
};
