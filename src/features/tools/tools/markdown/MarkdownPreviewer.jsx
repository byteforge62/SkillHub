import { useState } from "react";
import { ToolPageLayout } from "../../components/ToolPageLayout";
import Button from "@/components/ui/Button";

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
        <ToolPageLayout
            title="Markdown Previewer"
            description="Write Markdown and preview the rendered result."
            category="Documentation"
            usefulFor={["Markdown", "README Files", "Documentation"]}
        >
            <div className="space-y-6">
{/* Controls */}
                <div className="mb-6 flex flex-wrap gap-3">
                    <Button variant="secondary" onClick={handleSample}>
                        Sample
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleCopy}
                        disabled={!markdown}
                    >
                        {copied ? "Copied!" : "Copy Markdown"}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={handleClear}
                        disabled={!markdown}
                    >
                        Clear
                    </Button>
                </div>

                {/* Editor + Preview */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Editor */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label
                                htmlFor="markdown-editor"
                                className="code-field-label"
                            >
                                Markdown
                            </label>

                            <span className="code-field-meta">
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
                            className="code-field min-h-[600px]"
                            spellCheck={false}
                        />
                    </div>

                    {/* Preview */}
                    <div>
                        <div className="mb-2">
                            <span className="code-field-label">Preview</span>
                        </div>

                        <div className="min-h-[600px] rounded-2xl border border-[color:var(--color-line)] bg-white p-6">
                            {markdown ? (
                                <div className="prose max-w-none prose-headings:font-bold prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-code:break-words">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {markdown}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <div className="flex min-h-[540px] items-center justify-center text-center text-sm text-text-muted">
                                    Your Markdown preview will appear here.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Information */}
                <div className="mt-6 rounded-2xl border border-[color:var(--color-line)] bg-sage p-5">
                    <h2 className="font-semibold">Markdown Quick Reference</h2>

                    <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                        <div>
                            <code className="font-mono text-text-secondary"># Heading</code>
                        </div>

                        <div>
                            <code className="font-mono text-text-secondary">**Bold text**</code>
                        </div>

                        <div>
                            <code className="font-mono text-text-secondary">*Italic text*</code>
                        </div>

                        <div>
                            <code className="font-mono text-text-secondary">[Link](https://example.com)</code>
                        </div>

                        <div>
                            <code className="font-mono text-text-secondary">- List item</code>
                        </div>

                        <div>
                            <code className="font-mono text-text-secondary">\`inline code\`</code>
                        </div>
                    </div>
                </div>
            </div>
        </ToolPageLayout>
    );
};