import { getQuizAnswerReviewData } from "./quizAnswerReviewData";

export const QuizAnswerReview = ({ answers = [], questions = [] }) => {
  const questionList = Array.isArray(questions) ? questions : [];

  if (!Array.isArray(answers) || answers.length === 0) {
    return (
      <p className="text-sm text-text-muted">
        Answer details are not available for this attempt.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {answers.map((answer, index) => {
        const {
          questionId,
          questionText,
          selectedAnswerText,
          correctAnswerText,
          isCorrect,
        } = getQuizAnswerReviewData(answer, questionList);

        return (
          <div
            key={questionId?.toString() || index}
            className={`rounded-xl border p-5 ${
              isCorrect
                ? "border-success/20 bg-success/5"
                : "border-error/20 bg-error/5"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isCorrect
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                {isCorrect ? "✓" : "✕"}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Question {index + 1}
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-text-primary">
                  {questionText}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-border bg-surface p-4">
              <p className="text-xs font-medium text-text-muted">Your answer</p>
              <p
                className={`mt-1 text-sm font-medium ${
                  isCorrect ? "text-success" : "text-error"
                }`}
              >
                {selectedAnswerText}
              </p>
            </div>

            {!isCorrect && correctAnswerText && (
              <div className="mt-3 rounded-lg border border-success/20 bg-success/5 p-4">
                <p className="text-xs font-medium text-text-muted">
                  Correct answer
                </p>
                <p className="mt-1 text-sm font-medium text-success">
                  {correctAnswerText}
                </p>
              </div>
            )}

            <p
              className={`mt-3 text-xs font-semibold ${
                isCorrect ? "text-success" : "text-error"
              }`}
            >
              {isCorrect ? "Correct answer" : "Incorrect answer"}
            </p>
          </div>
        );
      })}
    </div>
  );
};
