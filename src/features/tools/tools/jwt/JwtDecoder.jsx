import { useState } from "react";
import { ToolPageLayout } from "../../components/ToolPageLayout";
import Button from "@/components/ui/Button";

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
    <ToolPageLayout
      title="JWT Decoder"
      description="Decode JWT header and payload locally in your browser."
      category="Authentication & Security"
      usefulFor={["JWT", "Authentication", "Authorization"]}
    >
      <div className="space-y-6">
{/* SECURITY NOTICE */}
        <div className="mb-6 rounded-2xl border border-warning/20 bg-warning/5 p-4">
          <p className="text-sm font-semibold text-warning">
            Security Notice
          </p>

          <p className="mt-1 text-sm text-warning">
            This tool only decodes the JWT. It does not verify the token
            signature or prove that the token is authentic.
          </p>
        </div>

        {/* TOKEN INPUT */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="jwt-token"
              className="code-field-label"
            >
              JWT Token
            </label>

            <span className="code-field-meta">
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
            className="code-field min-h-[180px]"
            spellCheck={false}
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="primary" onClick={handleDecode}>
  Decode JWT
</Button>

            <Button variant="secondary" onClick={handleSample}>
  Load Sample
</Button>

            <Button variant="secondary" onClick={handleClear}>
  Clear
</Button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-error/20 bg-error/5 p-4 text-sm text-error">
            {error}
          </div>
        )}

        {/* DECODED DATA */}
        {(header || payload) && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* HEADER */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="code-field-label">Header</h2>

                <span className="rounded-full bg-sage px-2 py-1 text-xs text-text-muted">
                  JSON
                </span>
              </div>

              <pre className="code-field min-h-[300px] overflow-auto">
                {JSON.stringify(header, null, 2)}
              </pre>
            </div>

            {/* PAYLOAD */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="code-field-label">Payload</h2>

                <span className="rounded-full bg-sage px-2 py-1 text-xs text-text-muted">
                  JSON
                </span>
              </div>

              <pre className="code-field min-h-[300px] overflow-auto">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!header && !payload && !error && (
          <div className="rounded-2xl border border-dashed border-[color:var(--color-line)] p-10 text-center">
            <p className="font-medium text-text-secondary">
              Decoded JWT data will appear here.
            </p>

            <p className="mt-2 text-sm text-text-muted">
              Paste a token above or load the sample token.
            </p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};


