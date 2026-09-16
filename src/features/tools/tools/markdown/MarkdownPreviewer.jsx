import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SAMPLE_MARKDOWN = `# Welcome to SkillHub

This is a **Markdown previewer** built for developers.

## Features

- Live Markdown preview
- **Bold** and *italic* text
- Lists
- Links
- Code blocks
- Tables
- Task lists

### JavaScript Example

\`\`\`javascript
const greeting = "Hello SkillHub";

console.log(greeting);
\`\`\`

> Markdown makes it easy to create structured content.

| Feature | Supported |
| --- | --- |
| Headings | Yes |
| Code blocks | Yes |
| Tables | Yes |
| Task lists | Yes |

### Tasks

- [x] Write Markdown
- [x] Preview Markdown
- [ ] Become a Markdown expert
`;

export const MarkdownPreviewer = () => {
    const [markdown, setMarkdown] = useState("");
    const [copied, setCopied] = useState(false);

    const handleSample = () => {
        setMarkdown(SAMPLE_MARKDOWN);
        setCopied(false);
    };

    const handleClear = () => {
        setMarkdown("");
        setCopied(false);
    };

    const handleCopy = async () => {
        if (!markdown) {
            return;
        }

        try {
            await navigator.clipboard.writeText(markdown);

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
                    Markdown Previewer
                </h1>

                <p className="mt-2 max-w-2xl text-gray-500">
                    Write Markdown and see the rendered result instantly in
                    your browser.
                </p>
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
                    onClick={handleCopy}
                    disabled={!markdown}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {copied ? "Copied!" : "Copy Markdown"}
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    disabled={!markdown}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Clear
                </button>
            </div>

            {/* Editor + Preview */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Editor */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label
                            htmlFor="markdown-editor"
                            className="text-sm font-semibold"
                        >
                            Markdown
                        </label>

                        <span className="text-xs text-gray-400">
                            {markdown.length} characters
                        </span>
                    </div>

                    <textarea
                        id="markdown-editor"
                        value={markdown}
                        onChange={(event) => {
                            setMarkdown(event.target.value);
                            setCopied(false);
                        }}
                        placeholder="Write your Markdown here..."
                        className="min-h-[600px] w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm leading-6 outline-none focus:border-gray-400"
                        spellCheck={false}
                    />
                </div>

                {/* Preview */}
                <div>
                    <div className="mb-2">
                        <span className="text-sm font-semibold">
                            Preview
                        </span>
                    </div>

                    <div className="min-h-[600px] rounded-xl border border-gray-200 bg-white p-6">
                        {markdown ? (
                            <div className="prose max-w-none prose-headings:font-bold prose-pre:overflow-x-auto prose-pre:rounded-lg prose-code:break-words">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {markdown}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="flex min-h-[540px] items-center justify-center text-center text-sm text-gray-400">
                                Your Markdown preview will appear here.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Information */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h2 className="font-semibold">
                    Markdown Quick Reference
                </h2>

                <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                    <div>
                        <code># Heading</code>
                    </div>

                    <div>
                        <code>**Bold text**</code>
                    </div>

                    <div>
                        <code>*Italic text*</code>
                    </div>

                    <div>
                        <code>[Link](https://example.com)</code>
                    </div>

                    <div>
                        <code>- List item</code>
                    </div>

                    <div>
                        <code>`inline code`</code>
                    </div>
                </div>
            </div>
        </div>
    );
};

