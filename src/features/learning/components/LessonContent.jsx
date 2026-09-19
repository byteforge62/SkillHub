import Card from "@/components/ui/Card";
export const LessonContent = ({ lesson }) => {
  if (!lesson) {
    return (
      <Card className="flex min-h-[600px] items-center justify-center">
        <div className="text-center">
          <div className="text-4xl">📚</div>

          <h2 className="mt-4 text-xl font-semibold text-text-primary">
            Select a lesson
          </h2>

          <p className="mt-2 text-sm text-text-muted">
            Select a lesson from the course content to begin learning.
          </p>
        </div>
      </Card>
    );
  }

  const blocks = [...(lesson.blocks || [])].sort(
    (a, b) => a.order - b.order
  );

  return (
    <Card className="!p-0 overflow-hidden">
      {/* Lesson Header */}
      <div className="border-b border-border px-6 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Lesson {lesson.order}
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">
          {lesson.title}
        </h2>

        {lesson.description && (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-text-muted">
            {lesson.description}
          </p>
        )}

        {lesson.duration !== undefined && (
          <p className="mt-4 text-xs text-text-muted">
            {lesson.duration} min
          </p>
        )}
      </div>

      {/* Lesson Blocks */}
      <div className="space-y-6 px-6 py-7 sm:px-8">
        {blocks.length === 0 ? (
          <p className="text-sm text-text-muted">
            This lesson does not contain any content yet.
          </p>
        ) : (
          blocks.map((block) => {
            switch (block.type) {
              case "text":
                return (
                  <div key={block._id}>
                    <p className="whitespace-pre-line text-sm leading-7 text-text-secondary">
                      {block.data?.content}
                    </p>
                  </div>
                );

              case "code":
                return (
                  <div
                    key={block._id}
                    className="overflow-hidden rounded-xl border border-border bg-surface-hover"
                  >
                    <div className="border-b border-border px-4 py-2">
                      <span className="font-mono text-xs text-text-muted">
                        {block.data?.language || "code"}
                      </span>
                    </div>

                    <pre className="overflow-x-auto p-5">
                      <code className="font-mono text-sm leading-6 text-text-primary">
                        {block.data?.code}
                      </code>
                    </pre>
                  </div>
                );

              case "callout":
                return (
                  <div
                    key={block._id}
                    className="rounded-xl border border-primary/20 bg-primary/5 p-5"
                  >
                    {block.data?.title && (
                      <h3 className="text-sm font-semibold text-primary">
                        {block.data.title}
                      </h3>
                    )}

                    {block.data?.content && (
                      <p className="mt-2 text-sm leading-6 text-text-secondary">
                        {block.data.content}
                      </p>
                    )}
                  </div>
                );

              case "resource":
                return (
                  <div
                    key={block._id}
                    className="rounded-xl border border-border bg-surface-hover/50 p-5"
                  >
                    <p className="text-sm font-medium text-text-primary">
                      Resource
                    </p>

                    <p className="mt-1 text-xs text-text-muted">
                      Resource loading will be implemented next.
                    </p>
                  </div>
                );

              case "quiz":
                return (
                  <div
                    key={block._id}
                    className="rounded-xl border border-border bg-surface-hover/50 p-5"
                  >
                    <p className="text-sm font-medium text-text-primary">
                      Quiz
                    </p>

                    <p className="mt-1 text-xs text-text-muted">
                      Quiz loading will be implemented next.
                    </p>
                  </div>
                );

              default:
                return null;
            }
          })
        )}
      </div>
    </Card>
  );
};

