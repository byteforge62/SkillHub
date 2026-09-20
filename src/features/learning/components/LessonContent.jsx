import Card from "@/components/ui/Card";

export const LessonContent = ({
  lesson,
  resourceData,
  resourceLoading,
  resourceError,
}) => {
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

              case "resource": {
                if (resourceLoading) {
                  return (
                    <div
                      key={block._id}
                      className="rounded-xl border border-border bg-surface-hover/50 p-5"
                    >
                      <p className="text-sm text-text-muted">
                        Loading resource...
                      </p>
                    </div>
                  );
                }

                if (resourceError || !resourceData?.data) {
                  return (
                    <div
                      key={block._id}
                      className="rounded-xl border border-error/20 bg-error/5 p-5"
                    >
                      <p className="text-sm font-medium text-error">
                        Unable to load resource
                      </p>
                    </div>
                  );
                }

                const resource = resourceData.data;

                return (
                  <div
                    key={block._id}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Resource
                        </p>

                        <h3 className="mt-2 text-lg font-semibold text-text-primary">
                          {resource.title}
                        </h3>

                        {resource.description && (
                          <p className="mt-2 text-sm leading-6 text-text-muted">
                            {resource.description}
                          </p>
                        )}
                      </div>

                      {resource.type && (
                        <span className="shrink-0 rounded-full bg-accent-light px-2.5 py-1 text-xs font-medium capitalize text-text-secondary">
                          {resource.type}
                        </span>
                      )}
                    </div>

                    {resource.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-surface-hover px-2.5 py-1 text-xs text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {resource.url && (
                      <div className="mt-5 border-t border-border pt-4">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                        >
                          Open Resource
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

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

export default LessonContent;