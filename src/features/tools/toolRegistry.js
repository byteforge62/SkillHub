const toolRegistry = [
    {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format, validate, and inspect JSON data.",
        category: "Developer Tools",
        icon: "braces",
        usefulFor: ["REST APIs", "JSON", "API Responses"],
    },

    {
        id: "jwt-decoder",
        name: "JWT Decoder",
        description:
            "Decode JWT header and payload locally in your browser.",
        category: "Authentication & Security",
        icon: "key-round",
        usefulFor: ["JWT", "Authentication", "Authorization"],
    },

    {
        id: "base64",
        name: "Base64 Encoder / Decoder",
        description:
            "Encode and decode Base64 text quickly in your browser.",
        category: "Authentication & Security",
        icon: "binary",
        usefulFor: ["Base64", "Data Encoding", "Web Development"],
    },

    {
        id: "url-encoder",
        name: "URL Encoder / Decoder",
        description:
            "Encode and decode URL components safely directly in your browser.",
        category: "Developer Tools",
        icon: "link",
        usefulFor: ["URLs", "Query Parameters", "APIs"],
    },

    {
        id: "uuid-generator",
        name: "UUID Generator",
        description:
            "Generate unique UUIDs for development and testing.",
        category: "Developer Tools",
        icon: "fingerprint",
        usefulFor: ["UUID", "Databases", "Backend Development"],
    },

    {
        id: "regex-tester",
        name: "Regex Tester",
        description:
            "Test regular expressions against text with instant feedback.",
        category: "Programming & Validation",
        icon: "regex",
        usefulFor: ["Regular Expressions", "Validation", "JavaScript"],
    },

    {
        id: "markdown-preview",
        name: "Markdown Previewer",
        description:
            "Write Markdown and preview the rendered result.",
        category: "Documentation",
        icon: "file-text",
        usefulFor: ["Markdown", "README Files", "Documentation"],
    },
];

export default toolRegistry;