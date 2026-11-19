import Button from "@/components/ui/Button";

import { QuizAttemptHistory } from "./QuizAttemptHistory";
import { QuizAttemptDetails } from "./QuizAttemptDetails";
import { QuizAnswerReview } from "./QuizAnswerReview";

export const QuizResult = ({
    quizResult,
    quiz,
    questions,
    quizAttempts,
    quizAttemptsLoading,
    quizAttemptsError,
    onRetryAttempts,
    selectedAttemptId,
    onSelectAttempt,
    savedAttemptData,
    savedAttemptLoading,
    savedAttemptError,
    onCloseAttempt,
    onRetake
}) => {
    return (
        <div className="space-y-6">
            {/* Result Header */}
            <div className="border-b border-[color:var(--color-line)] pb-5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
                    Quiz Completed
                </p>

                <h3 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-text-primary">
                    {quiz?.title || "Quiz"}
                </h3>

                <p className="mt-2 text-sm text-text-muted">
                    Your quiz has been submitted successfully.
                </p>
            </div>

            {/* Result Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[color:var(--color-line)] bg-sage p-5 text-center">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                        Score
                    </p>

                    <p className="mt-2 text-3xl font-bold text-text-primary">
                        {quizResult.score ?? 0}
                    </p>
                </div>

                <div className="rounded-2xl border border-[color:var(--color-line)] bg-sage p-5 text-center">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                        Percentage
                    </p>

                    <p className="mt-2 text-3xl font-bold text-text-primary">
                        {quizResult.percentage ?? 0}%
                    </p>
                </div>

                <div className="rounded-2xl border border-[color:var(--color-line)] bg-sage p-5 text-center">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                        Result
                    </p>

                    <p
                        className={`mt-2 text-xl font-bold ${quizResult.passed
                            ? "text-success"
                            : "text-error"
                            }`}
                    >
                        {quizResult.passed ? "Passed" : "Not Passed"}
                    </p>
                </div>
            </div>

            {/* Passing Score */}
            {quiz?.passingScore !== undefined && (
                <div className="rounded-2xl border border-[color:var(--color-line)] bg-sage p-4">
                    <p className="text-sm text-text-muted">
                        Passing score:{" "}
                        <span className="font-semibold text-text-primary">
                            {quiz?.passingScore}%
                        </span>
                    </p>
                </div>
            )}

            <QuizAnswerReview
                answers={quizResult?.answers}
                questions={questions}
            />

            {/* Retake */}
            <div className="flex justify-end border-t border-[color:var(--color-line)] pt-5">
                <Button
                    variant="secondary"
                    onClick={onRetake}
                >
                    Retake Quiz
                </Button>
            </div>

            {selectedAttemptId ? (
                <div className="mt-6">
                    {savedAttemptLoading && (
                        <div className="rounded-2xl border border-[color:var(--color-line)] bg-white p-6">
                            <p className="text-sm text-text-muted">
                                Loading attempt details...
                            </p>
                        </div>
                    )}

                    {savedAttemptError && (
                        <div className="rounded-2xl border border-error/20 bg-error/5 p-6">
                            <p className="text-sm text-error">
                                Unable to load this attempt.
                            </p>

                            <Button
                                variant="secondary"
                                onClick={onCloseAttempt}
                                className="mt-4"
                            >
                                Back to attempts
                            </Button>
                        </div>
                    )}

                    {!savedAttemptLoading &&
                        !savedAttemptError &&
                        savedAttemptData?.data && (
                            <QuizAttemptDetails
                                attempt={savedAttemptData.data}
                                onClose={onCloseAttempt}
                            />
                        )}
                </div>
            ) : (
                <QuizAttemptHistory
                    attempts={quizAttempts}
                    loading={quizAttemptsLoading}
                    error={quizAttemptsError}
                    onRetry={onRetryAttempts}
                    onSelectAttempt={onSelectAttempt}
                />
            )}
        </div>
    )
}
