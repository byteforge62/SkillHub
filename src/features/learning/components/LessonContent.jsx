import Card from "@/components/ui/Card";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuizById, getQuizQuestions } from "../api/learningApi";

export const LessonContent = ({
  lesson,
  resourceData,
  resourceLoading,
  resourceError,
}) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showOnlyQuiz, setShowOnlyQuiz] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const blocks = [...(lesson?.blocks || [])].sort(
    (a, b) => a.order - b.order
  );

  const quizBlock = blocks.find(
    (block) => block.type === "quiz" && block.data?.quizId
  );

  const quizId = quizBlock?.data?.quizId;

  const {
    data: quizData,
    isLoading: quizLoading,
    isError: quizError,
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuizById(quizId),
    enabled: Boolean(quizId),
  });

  const {
    data: quizQuestionsData,
    isLoading: quizQuestionsLoading,
    isError: quizQuestionsError,
  } = useQuery({
    queryKey: ["quiz-questions", quizId],
    queryFn: () => getQuizQuestions(quizId),
    enabled: Boolean(quizId),
  });

  const questions = quizQuestionsData?.data || [];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (quizStarted) {
      const timer = setTimeout(() => {
        setShowOnlyQuiz(true);
      }, 300);

      return () => clearTimeout(timer);
    }

    setShowOnlyQuiz(false);
  }, [quizStarted]);

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

  const isLastQuestion =
    questions.length > 0 &&
    currentQuestionIndex === questions.length - 1;

  const hasSelectedAnswer =
    currentQuestion &&
    Boolean(selectedAnswers[currentQuestion._id]);

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizStarted(true);
  };

  const handleAnswerSelect = (optionId) => {
    if (!currentQuestion) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (!currentQuestion || !hasSelectedAnswer) return;

    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

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
      <div className="grid grid-cols-1 gap-5 px-6 py-7 sm:px-8 lg:grid-cols-12 lg:items-start">
        {blocks.length === 0 ? (
          <p className="text-sm text-text-muted">
            This lesson does not contain any content yet.
          </p>
        ) : (
          blocks.map((block) => {
            /*
             * After the fade animation finishes, remove all
             * non-quiz blocks from the layout.
             */
            if (showOnlyQuiz && block.type !== "quiz") {
              return null;
            }

            switch (block.type) {
              case "text":
                return (
                  <div
                    key={block._id}
                    className={`lg:col-span-7 transition-all duration-300 ease-out ${
                      quizStarted
                        ? "pointer-events-none scale-[0.98] opacity-0"
                        : "scale-100 opacity-100"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm leading-7 text-text-secondary">
                      {block.data?.content}
                    </p>
                  </div>
                );

              case "code":
                return (
                  <div
                    key={block._id}
                    className={`lg:col-span-5 overflow-hidden rounded-xl border border-border bg-surface-hover transition-all duration-300 ease-out ${
                      quizStarted
                        ? "pointer-events-none scale-[0.98] opacity-0"
                        : "scale-100 opacity-100"
                    }`}
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
                    className={`lg:col-span-7 rounded-xl border border-primary/20 bg-primary/5 p-5 transition-all duration-300 ease-out ${
                      quizStarted
                        ? "pointer-events-none scale-[0.98] opacity-0"
                        : "scale-100 opacity-100"
                    }`}
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
                      className={`lg:col-span-5 rounded-xl border border-border bg-surface-hover/50 p-5 transition-all duration-300 ease-out ${
                        quizStarted
                          ? "pointer-events-none scale-[0.98] opacity-0"
                          : "scale-100 opacity-100"
                      }`}
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
                      className={`lg:col-span-5 rounded-xl border border-error/20 bg-error/5 p-5 transition-all duration-300 ease-out ${
                        quizStarted
                          ? "pointer-events-none scale-[0.98] opacity-0"
                          : "scale-100 opacity-100"
                      }`}
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
                    className={`lg:col-span-5 rounded-xl border border-border bg-surface p-5 transition-all duration-300 ease-out ${
                      quizStarted
                        ? "pointer-events-none scale-[0.98] opacity-0"
                        : "scale-100 opacity-100"
                    }`}
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
                    className={`lg:col-span-12 rounded-xl border border-border bg-surface p-5 transition-all duration-500 ease-out ${
                      quizStarted
                        ? "scale-100 opacity-100"
                        : "scale-[0.98] opacity-100"
                    }`}
                  >
                    {quizLoading ? (
                      <p className="text-sm text-text-muted">
                        Loading quiz...
                      </p>
                    ) : quizError ? (
                      <p className="text-sm text-error">
                        Unable to load quiz.
                      </p>
                    ) : (
                      <>
                        {!quizStarted ? (
                          /* ================= QUIZ INTRO ================= */
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                              Quiz
                            </p>

                            <h3 className="mt-2 text-xl font-semibold text-text-primary">
                              {quizData?.data?.title || "Quiz"}
                            </h3>

                            {quizData?.data?.description && (
                              <p className="mt-2 text-sm leading-6 text-text-muted">
                                {quizData.data.description}
                              </p>
                            )}

                            <div className="mt-4 flex flex-wrap gap-3 text-xs text-text-muted">
                              <span>
                                {questions.length}{" "}
                                {questions.length === 1
                                  ? "question"
                                  : "questions"}
                              </span>

                              {quizData?.data?.passingScore !== undefined && (
                                <span>
                                  Passing score:{" "}
                                  {quizData.data.passingScore}%
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={handleStartQuiz}
                              disabled={
                                quizQuestionsLoading ||
                                questions.length === 0
                              }
                              className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {quizQuestionsLoading
                                ? "Loading Questions..."
                                : "Start Quiz"}
                            </button>
                          </div>
                        ) : (
                          /* ================= QUIZ QUESTIONS ================= */
                          <div>
                            <div className="border-b border-border pb-4">
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                                  Quiz
                                </p>

                                {questions.length > 0 && (
                                  <p className="text-xs font-medium text-text-muted">
                                    {currentQuestionIndex + 1} /{" "}
                                    {questions.length}
                                  </p>
                                )}
                              </div>

                              <h3 className="mt-2 text-xl font-semibold text-text-primary">
                                {quizData?.data?.title || "Quiz"}
                              </h3>

                              {questions.length > 0 && (
                                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-hover">
                                  <div
                                    className="h-full bg-primary transition-all duration-300 ease-out"
                                    style={{
                                      width: `${
                                        ((currentQuestionIndex + 1) /
                                          questions.length) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                              )}
                            </div>

                            {quizQuestionsLoading ? (
                              <p className="mt-5 text-sm text-text-muted">
                                Loading questions...
                              </p>
                            ) : quizQuestionsError ? (
                              <p className="mt-5 text-sm text-error">
                                Unable to load questions.
                              </p>
                            ) : questions.length === 0 ? (
                              <p className="mt-5 text-sm text-text-muted">
                                No questions are available for this quiz.
                              </p>
                            ) : currentQuestion ? (
                              <div
                                key={currentQuestion._id}
                                className="mt-5 rounded-xl border border-border bg-surface-hover/50 p-5"
                              >
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                                  Question {currentQuestionIndex + 1}
                                </p>

                                <h4 className="mt-2 text-base font-semibold leading-6 text-text-primary">
                                  {currentQuestion.question}
                                </h4>

                                <div className="mt-4 space-y-2">
                                  {currentQuestion.options?.map(
                                    (option, optionIndex) => {
                                      const isSelected =
                                        selectedAnswers[
                                          currentQuestion._id
                                        ] === option._id;

                                      return (
                                        <label
                                          key={option._id || optionIndex}
                                          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-200 ${
                                            isSelected
                                              ? "border-primary bg-primary/5"
                                              : "border-border bg-surface hover:bg-surface-hover"
                                          }`}
                                        >
                                          <input
                                            type="radio"
                                            name={`question-${currentQuestion._id}`}
                                            value={option._id}
                                            checked={isSelected}
                                            onChange={() =>
                                              handleAnswerSelect(option._id)
                                            }
                                            className="accent-primary"
                                          />

                                          <span className="text-sm text-text-secondary">
                                            {option.text}
                                          </span>
                                        </label>
                                      );
                                    }
                                  )}
                                </div>

                                <div className="mt-6 flex items-center justify-between gap-4">
                                  <p className="text-xs text-text-muted">
                                    {hasSelectedAnswer
                                      ? "Answer selected"
                                      : "Select an answer to continue"}
                                  </p>

                                  <button
                                    type="button"
                                    disabled={!hasSelectedAnswer}
                                    onClick={handleNextQuestion}
                                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    {isLastQuestion
                                      ? "Submit Quiz"
                                      : "Next"}
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </>
                    )}
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
