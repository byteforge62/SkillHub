import Button from "@/components/ui/Button";
import { QuizAnswerReview } from "./QuizAnswerReview";

export const QuizAttemptDetails = ({ attempt, onClose }) => {
  if (!attempt) return null;

  return (
    <div className="mt-6 rounded-2xl border border-[color:var(--color-line)] bg-white p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-[color:var(--color-line)] pb-5">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
            Attempt Details
          </p>

          <h3 className="mt-2 text-[18px] font-bold tracking-[-0.025em] text-text-primary">
            {attempt.quiz?.title || "Quiz Attempt"}
          </h3>

          {attempt.submittedAt && (
            <p className="mt-1 text-sm text-text-muted">
              Submitted{" "}
              {new Date(attempt.submittedAt).toLocaleString()}
            </p>
          )}
        </div>

        <Button
          variant="secondary"
          onClick={onClose}
          className="px-3 py-2 text-sm"
        >
          Close
        </Button>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--color-line)] bg-sage p-4">
          <p className="text-xs text-text-muted">Score</p>
          <p className="mt-1 text-[15px] font-bold tracking-[-0.02em] text-text-primary">
            {attempt.score}
          </p>
        </div>

        <div className="rounded-2xl border border-[color:var(--color-line)] bg-sage p-4">
          <p className="text-xs text-text-muted">Percentage</p>
          <p className="mt-1 text-[15px] font-bold tracking-[-0.02em] text-text-primary">
            {attempt.percentage}%
          </p>
        </div>

        <div className="rounded-2xl border border-[color:var(--color-line)] bg-sage p-4">
          <p className="text-xs text-text-muted">Status</p>
          <p
            className={`mt-1 text-[15px] font-bold tracking-[-0.02em] ${
              attempt.passed ? "text-success" : "text-error"
            }`}
          >
            {attempt.passed ? "Passed" : "Failed"}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <h4 className="text-base font-semibold text-text-primary">
          Answer Review
        </h4>
        <div className="mt-4">
          <QuizAnswerReview answers={attempt.answers} />
        </div>
      </div>
    </div>
  );
};
