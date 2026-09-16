import { useMemo, useState } from "react";

const SAMPLE_PATTERN = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b";

const SAMPLE_TEXT = `Contact us at hello@skillhub.com or support@example.org.
You can also reach admin@demo.dev for technical questions.`;

export const RegexTester = () => {
    const [pattern, setPattern] = useState("");
    const [testText, setTestText] = useState("");
    const [flags, setFlags] = useState("g");
    const [copied, setCopied] = useState(false);

    const result = useMemo(() => {
        if (!pattern) {
            return {
                matches: [],
                error: "",
                regex: null,
            };
        }

        try {
            const regex = new RegExp(pattern, flags);

            const matches = [];

            if (regex.global) {
                let match;

                while ((match = regex.exec(testText)) !== null) {
                    matches.push({
                        value: match[0],
                        index: match.index,
                    });

                    // Prevent infinite loops for zero-length matches.
                    if (match[0] === "") {
                        regex.lastIndex++;
                    }
                }
            } else {
                const match = regex.exec(testText);

                if (match) {
                    matches.push({
                        value: match[0],
                        index: match.index,
                    });
                }
            }

            return {
                matches,
                error: "",
                regex,
            };
        } catch (error) {
            return {
                matches: [],
                error: error.message || "Invalid regular expression.",
                regex: null,
            };
        }
    }, [pattern, flags, testText]);

    const handleSample = () => {
        setPattern(SAMPLE_PATTERN);
        setTestText(SAMPLE_TEXT);
        setFlags("g");
        setCopied(false);
    };

    const handleClear = () => {
        setPattern("");
        setTestText("");
        setFlags("g");
        setCopied(false);
    };

    const handleCopyMatches = async () => {
        if (!result.matches.length) {
            return;
        }

        try {
            await navigator.clipboard.writeText(
                result.matches.map((match) => match.value).join("\n")
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Regex Tester
                </h1>

                <p className="mt-2 max-w-2xl text-gray-500">
                    Test regular expressions against text and inspect matches
                    instantly in your browser.
                </p>
            </div>

            {/* Pattern + Flags */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
                <div className="grid gap-5 md:grid-cols-[1fr_180px]">
                    <div>
                        <label
                            htmlFor="regex-pattern"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Regular Expression
                        </label>

                        <input
                            id="regex-pattern"
                            type="text"
                            value={pattern}
                            onChange={(event) => {
                                setPattern(event.target.value);
                                setCopied(false);
                            }}
                            placeholder="Example: \\d+"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm outline-none focus:border-gray-400"
                            spellCheck={false}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="regex-flags"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Flags
                        </label>

                        <input
                            id="regex-flags"
                            type="text"
                            value={flags}
                            onChange={(event) => {
                                setFlags(event.target.value);
                                setCopied(false);
                            }}
                            placeholder="gim"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm outline-none focus:border-gray-400"
                            spellCheck={false}
                        />
                    </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                    Common flags: <code>g</code> global, <code>i</code>{" "}
                    case-insensitive, <code>m</code> multiline,{" "}
                    <code>s</code> dotAll, <code>u</code> Unicode,{" "}
                    <code>y</code> sticky.
                </div>
            </div>

            {/* Test Text */}
            <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                    <label
                        htmlFor="regex-test-text"
                        className="text-sm font-semibold"
                    >
                        Test Text
                    </label>

                    <span className="text-xs text-gray-400">
                        {testText.length} characters
                    </span>
                </div>

                <textarea
                    id="regex-test-text"
                    value={testText}
                    onChange={(event) => {
                        setTestText(event.target.value);
                        setCopied(false);
                    }}
                    placeholder="Enter text to test against your regular expression..."
                    className="min-h-[240px] w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-gray-400"
                    spellCheck={false}
                />
            </div>

            {/* Controls */}
            <div className="mb-6 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={handleSample}
                    className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-80"
                >
                    Sample
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
                >
                    Clear
                </button>

                <button
                    type="button"
                    onClick={handleCopyMatches}
                    disabled={!result.matches.length}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {copied ? "Copied!" : "Copy Matches"}
                </button>
            </div>

            {/* Error */}
            {result.error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-semibold text-red-700">
                        Invalid Regular Expression
                    </p>

                    <p className="mt-1 text-sm text-red-600">
                        {result.error}
                    </p>
                </div>
            )}

            {/* Results */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-semibold">
                            Match Results
                        </h2>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                            {result.matches.length}{" "}
                            {result.matches.length === 1
                                ? "match"
                                : "matches"}
                        </span>
                    </div>

                    {result.matches.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-400">
                            {pattern && testText
                                ? "No matches found."
                                : "Enter a pattern and test text to see matches."}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {result.matches.map((match, index) => (
                                <div
                                    key={`${match.index}-${index}`}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-semibold text-gray-500">
                                            Match {index + 1}
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            Position {match.index}
                                        </span>
                                    </div>

                                    <code className="block break-all font-mono text-sm">
                                        {match.value}
                                    </code>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Regex Info */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 font-semibold">
                        Regex Information
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Pattern
                            </p>

                            <code className="mt-1 block break-all rounded-lg bg-gray-50 p-3 font-mono">
                                {pattern || "—"}
                            </code>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Flags
                            </p>

                            <code className="mt-1 block rounded-lg bg-gray-50 p-3 font-mono">
                                {flags || "—"}
                            </code>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Status
                            </p>

                            <p className="mt-1">
                                {!pattern
                                    ? "Waiting for pattern"
                                    : result.error
                                      ? "Invalid pattern"
                                      : result.matches.length
                                        ? "Matches found"
                                        : "Valid pattern — no matches"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h2 className="font-semibold">
                    About Regex
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                    Regular expressions are patterns used to search, validate,
                    extract, and transform text. This tester runs entirely in
                    your browser using JavaScript's native RegExp engine.
                </p>
            </div>
        </div>
    );
};
