import toolRegistry from "../toolRegistry";
import { ToolCard } from "../components/ToolCard";

export const ToolsPage = () => {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Developer Tools</h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            Useful tools for developers and learners. Everything runs locally
            in your browser unless a tool specifically requires a backend.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {toolRegistry.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  )
}

