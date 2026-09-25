
export const QuizAttemptHistory = ({ 
    attempts = [],
    loading = false, 
    onSelectAttempt,
}) => {

    if (loading) {
        return (
            <div className="rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm text-text-muted">
                    Loading previous attempts...
                </p>
            </div>
        );
    }

    if (attempts.length === 0) {
        return (
            <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold text-text-primary">
                    Previous Attempts
                </h3>

                <p className="mt-2 text-sm text-text-muted">
                    You have not attempted this quiz yet.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-border bg-surface p-6">
            <div>
                <h3 className="text-lg font-semibold text-text-primary">
                    Previous Attempts
                </h3>

                <p className="mt-1 text-sm text-text-muted">
                    Review your previous quiz submissions.
                </p>
            </div>

            <div className="mt-5 space-y-3">
                {attempts.map((attempt, index) => (
                    <button
                        type="button"
                        key={attempt._id}
                        onClick={() => onSelectAttempt(attempt._id)}
                        className="group w-full rounded-xl border border-border bg-surface p-4 text-left transition-all duration-200 hover:border-primary/40 hover:bg-surface-hover"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-text-primary">
                                    Attempt #{attempts.length - index}
                                </p>

                                <p className="mt-1 text-xs text-text-muted">
                                    {new Date(attempt.submittedAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-text-primary">
                                        {attempt.percentage}%
                                    </p>

                                    <span
                                        className={`text-xs font-medium ${attempt.passed ? "text-success" : "text-error"
                                            }`}
                                    >
                                        {attempt.passed ? "Passed" : "Failed"}
                                    </span>
                                </div>

                                <span className="text-text-muted transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};


