export const QuizAttemptDetails = ({ attempt, onClose }) => {
  if (!attempt) return null;

  const answers = attempt.answers || [];

  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Attempt Details
          </p>

          <h3 className="mt-2 text-xl font-semibold text-text-primary">
            {attempt.quiz?.title || "Quiz Attempt"}
          </h3>

          {attempt.submittedAt && (
            <p className="mt-1 text-sm text-text-muted">
              Submitted{" "}
              {new Date(attempt.submittedAt).toLocaleString()}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
        >
          Close
        </button>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface-hover p-4">
          <p className="text-xs text-text-muted">Score</p>
          <p className="mt-1 text-lg font-semibold text-text-primary">
            {attempt.score}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-hover p-4">
          <p className="text-xs text-text-muted">Percentage</p>
          <p className="mt-1 text-lg font-semibold text-text-primary">
            {attempt.percentage}%
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface-hover p-4">
          <p className="text-xs text-text-muted">Status</p>
          <p
            className={`mt-1 text-lg font-semibold ${
              attempt.passed ? "text-success" : "text-error"
            }`}
          >
            {attempt.passed ? "Passed" : "Failed"}
          </p>
        </div>
      </div>

      {/* Answers */}
      <div className="mt-7">
        <h4 className="text-base font-semibold text-text-primary">
          Answer Review
        </h4>

        <div className="mt-4 space-y-3">
          {answers.map((answer, index) => (
            <div
              key={answer.question?._id || answer.question || index}
              className="rounded-xl border border-border bg-surface-hover p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    answer.isCorrect
                      ? "bg-success/10 text-success"
                      : "bg-error/10 text-error"
                  }`}
                >
                  {answer.isCorrect ? "✓" : "✕"}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    Question {index + 1}
                  </p>

                  {answer.question?.question && (
                    <p className="mt-1 text-sm text-text-secondary">
                      {answer.question.question}
                    </p>
                  )}

                  {answer.selectedOption?.text && (
                    <p className="mt-3 text-sm text-text-muted">
                      Your answer:{" "}
                      <span className="font-medium text-text-primary">
                        {answer.selectedOption.text}
                      </span>
                    </p>
                  )}

                  {answer.correctOption?.text && (
                    <p className="mt-1 text-sm text-text-muted">
                      Correct answer:{" "}
                      <span className="font-medium text-success">
                        {answer.correctOption.text}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

