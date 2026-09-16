import { useState } from "react";

const SAMPLE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNraWxsSHViIiwiaWF0IjoxNzAwMDAwMDAwfQ." +
  "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const decodeBase64Url = (value) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");

  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  const binary = atob(padded);

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
};

const decodeJwtPart = (part) => {
  const decoded = decodeBase64Url(part);

  return JSON.parse(decoded);
};

export const JwtDecoder = () => {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState("");

  const handleDecode = () => {
    setError("");
    setHeader(null);
    setPayload(null);

    if (!token.trim()) {
      setError("Please enter a JWT.");
      return;
    }

    const parts = token.trim().split(".");

    if (parts.length !== 3) {
      setError(
        "Invalid JWT structure. A JWT should contain three parts separated by dots."
      );
      return;
    }

    try {
      const decodedHeader = decodeJwtPart(parts[0]);
      const decodedPayload = decodeJwtPart(parts[1]);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
    } catch {
      setError(
        "Unable to decode JWT. Make sure the token contains valid Base64URL-encoded JSON."
      );
    }
  };

  const handleSample = () => {
    setToken(SAMPLE_TOKEN);
    setHeader(null);
    setPayload(null);
    setError("");
  };

  const handleClear = () => {
    setToken("");
    setHeader(null);
    setPayload(null);
    setError("");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">JWT Decoder</h1>

        <p className="mt-2 max-w-2xl text-gray-500">
          Decode and inspect the header and payload of a JSON Web Token
          directly in your browser.
        </p>
      </div>

      {/* SECURITY NOTICE */}
      <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm font-semibold text-yellow-800">
          Security Notice
        </p>

        <p className="mt-1 text-sm text-yellow-700">
          This tool only decodes the JWT. It does not verify the token
          signature or prove that the token is authentic.
        </p>
      </div>

      {/* TOKEN INPUT */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="jwt-token"
            className="text-sm font-semibold"
          >
            JWT Token
          </label>

          <span className="text-xs text-gray-400">
            {token.length} characters
          </span>
        </div>

        <textarea
          id="jwt-token"
          value={token}
          onChange={(event) => {
            setToken(event.target.value);
            setError("");
            setHeader(null);
            setPayload(null);
          }}
          placeholder="Paste your JWT token here..."
          className="min-h-[180px] w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-gray-400"
          spellCheck={false}
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDecode}
            className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80"
          >
            Decode JWT
          </button>

          <button
            type="button"
            onClick={handleSample}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
          >
            Load Sample
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

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* DECODED DATA */}
      {(header || payload) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* HEADER */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Header</h2>

              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                JSON
              </span>
            </div>

            <pre className="min-h-[300px] overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-5 font-mono text-sm">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>

          {/* PAYLOAD */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Payload</h2>

              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                JSON
              </span>
            </div>

            <pre className="min-h-[300px] overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-5 font-mono text-sm">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!header && !payload && !error && (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
          <p className="font-medium text-gray-600">
            Decoded JWT data will appear here.
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Paste a token above or load the sample token.
          </p>
        </div>
      )}
    </div>
  );
};

