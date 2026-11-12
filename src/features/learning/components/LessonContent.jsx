import Card from "@/components/ui/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getQuizById,
  getQuizQuestions,
  submitQuizAttempt,
  getQuizAttemptById,
  getMyQuizAttempts,
  getResourceById,
} from "../api/learningApi";

import { QuizResult } from "./quiz/QuizResult";
import { getSafeExternalUrl } from "./lessonBlockUtils";
import { queryClient } from "@/lib/query";
import toolRegistry from "@/features/tools/toolRegistry";

export const LessonContent = ({
  lesson,
}) => {

  const [quizStarted, setQuizStarted] = useState(false);
  const [showOnlyQuiz, setShowOnlyQuiz] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizSubmitError, setQuizSubmitError] = useState("");
  const [quizResult, setQuizResult] = useState(null);

  const [selectedAttemptId, setSelectedAttemptId] = useState(null);


  const blocks = [...(lesson?.blocks || [])].sort(
    (a, b) => a.order - b.order
  );

  const resourceBlocks = blocks.filter((block) => block.type === "resource");
  const resourceQueries = useQueries({
    queries: resourceBlocks.map((block) => ({
      queryKey: ["resource", block.data?.resourceId],
      queryFn: () => getResourceById(block.data.resourceId),
      enabled: Boolean(block.data?.resourceId),
    })),
  });
  const resourceQueriesByBlockId = new Map(
    resourceBlocks.map((block, index) => [block._id, resourceQueries[index]])
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

  const {
    data: savedAttemptData,
    isLoading: savedAttemptLoading,
    isError: savedAttemptError,
  } = useQuery({
    queryKey: ["quiz-attempt", selectedAttemptId],
    queryFn: () => getQuizAttemptById(selectedAttemptId),
    enabled: Boolean(selectedAttemptId),
  });

  const {
    data: quizAttemptsData,
    isLoading: quizAttemptsLoading,
    isError: quizAttemptsError,
    refetch: refetchQuizAttempts,
  } = useQuery({
    queryKey: ["quiz-attempts", quizId],
    queryFn: () => getMyQuizAttempts(quizId),
    enabled: Boolean(quizId && quizResult),
  });

  const questions = quizQuestionsData?.data || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmitQuiz = async () => {
    if (!quizId || questions.length === 0) return;

    const answers = Object.entries(selectedAnswers).map(
      ([question, selectedOption]) => ({
        question,
        selectedOption,
      })
    );

    if (answers.length !== questions.length) {
      setQuizSubmitError("Please answer every question before submitting.");
      return;
    }

    try {
      setQuizSubmitting(true);
      setQuizSubmitError("");
      const response = await submitQuizAttempt(quizId, answers);
      const attempt = response.data;

      if (!attempt?._id || !Array.isArray(attempt.answers)) {
        throw new Error("The quiz submission response was incomplete.");
      }

      setQuizResult(attempt);
      queryClient.invalidateQueries({
        queryKey: ["quiz-attempts", quizId],
      });
    } catch (error) {
      setQuizSubmitError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to submit your quiz. Please try again."
      );
    } finally {
      setQuizSubmitting(false);
    }
  };

  useEffect(() => {
    if (!quizStarted) return;

    const timer = setTimeout(() => {
      setShowOnlyQuiz(true);
    }, 300);

    return () => clearTimeout(timer);
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
    setQuizSubmitError("");
    setShowOnlyQuiz(false);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (optionId) => {
    if (!currentQuestion) return;

    setQuizSubmitError("");
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
                    className={`lg:col-span-7 transition-all duration-300 ease-out ${quizStarted
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
                    className={`lg:col-span-5 overflow-hidden rounded-xl border border-border bg-surface-hover transition-all duration-300 ease-out ${quizStarted
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

              case "image": {
                const imageUrl = getSafeExternalUrl(block.data?.url);

                return (
                <figure
                  key={block._id}
                  className={`lg:col-span-12 overflow-hidden rounded-xl border border-border bg-surface-hover transition-all duration-300 ease-out ${
                    quizStarted
                      ? "pointer-events-none scale-[0.98] opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={block.data?.alt || ""}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[70vh] w-full object-contain"
                    />
                  ) : (
                    <p className="p-5 text-sm text-text-muted" role="status">
                      This image is unavailable.
                    </p>
                  )}
                  {block.data?.caption && (
                    <figcaption className="border-t border-border px-4 py-3 text-sm text-text-muted">
                      {block.data.caption}
                    </figcaption>
                  )}
                </figure>
                );
              }

              case "video": {
                const videoUrl = getSafeExternalUrl(block.data?.url);

                return (
                <div
                  key={block._id}
                  className={`lg:col-span-12 overflow-hidden rounded-xl border border-border bg-surface-hover transition-all duration-300 ease-out ${
                    quizStarted
                      ? "pointer-events-none scale-[0.98] opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                >
                  {videoUrl ? (
                    <>
                      <video
                        controls
                        preload="metadata"
                        className="max-h-[70vh] w-full bg-black"
                      >
                        <source src={videoUrl} />
                        Your browser does not support video playback.
                      </video>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-4 py-3 text-sm font-medium text-primary hover:underline"
                      >
                        Open video in a new tab
                      </a>
                    </>
                  ) : (
                    <p className="p-5 text-sm text-text-muted" role="status">
                      This video is unavailable.
                    </p>
                  )}
                </div>
                );
              }

              case "callout":
                return (
                  <div
                    key={block._id}
                    className={`lg:col-span-7 rounded-xl border border-primary/20 bg-primary/5 p-5 transition-all duration-300 ease-out ${quizStarted
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
                const resourceQuery = resourceQueriesByBlockId.get(block._id);

                if (!block.data?.resourceId) {
                  return (
                    <p
                      key={block._id}
                      className="lg:col-span-5 rounded-xl border border-error/20 bg-error/5 p-5 text-sm text-error"
                      role="status"
                    >
                      This resource is unavailable.
                    </p>
                  );
                }

                if (resourceQuery?.isLoading) {
                  return (
                    <div
                      key={block._id}
                      className={`lg:col-span-5 rounded-xl border border-border bg-surface-hover/50 p-5 transition-all duration-300 ease-out ${quizStarted
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

                if (resourceQuery?.isError) {
                  return (
                    <div
                      key={block._id}
                      className={`lg:col-span-5 rounded-xl border border-error/20 bg-error/5 p-5 transition-all duration-300 ease-out ${quizStarted
                        ? "pointer-events-none scale-[0.98] opacity-0"
                        : "scale-100 opacity-100"
                        }`}
                    >
                      <p className="text-sm font-medium text-error" role="alert">
                        Unable to load this resource.
                      </p>
                      <button
                        type="button"
                        onClick={() => resourceQuery.refetch()}
                        className="mt-3 text-sm font-medium text-primary underline-offset-2 hover:underline"
                      >
                        Retry
                      </button>
                    </div>
                  );
                }

                if (!resourceQuery?.data?.data) {
                  return (
                    <p
                      key={block._id}
                      className="lg:col-span-5 rounded-xl border border-error/20 bg-error/5 p-5 text-sm text-error"
                      role="status"
                    >
                      This resource is no longer available.
                    </p>
                  );
                }

                const resource = resourceQuery.data.data;
                const resourceUrl = getSafeExternalUrl(resource.url);

                return (
                  <div
                    key={block._id}
                    className={`lg:col-span-5 rounded-xl border border-border bg-surface p-5 transition-all duration-300 ease-out ${quizStarted
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

                    {resourceUrl ? (
                      <div className="mt-5 border-t border-border pt-4">
                        <a
                          href={resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                        >
                          Open Resource
                        </a>
                      </div>
                    ) : (
                      <p className="mt-5 border-t border-border pt-4 text-sm text-error" role="status">
                        This resource link is unavailable.
                      </p>
                    )}
                  </div>
                );
              }

              case "quiz":
                return (
                  <div
                    key={block._id}
                    className={`lg:col-span-12 rounded-xl border border-border bg-surface p-5 transition-all duration-500 ease-out ${quizStarted
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
                    ) : quizResult ? (
                      /* =====================================================
                         QUIZ RESULT
                      ====================================================== */
                      <QuizResult
                        quizResult={quizResult}
                        quiz={quizData?.data}
                        questions={questions}
                        quizAttempts={quizAttemptsData?.data || []}
                        quizAttemptsLoading={quizAttemptsLoading}
                        quizAttemptsError={quizAttemptsError}
                        onRetryAttempts={refetchQuizAttempts}
                        selectedAttemptId={selectedAttemptId}
                        onSelectAttempt={setSelectedAttemptId}
                        savedAttemptData={savedAttemptData}
                        savedAttemptLoading={savedAttemptLoading}
                        savedAttemptError={savedAttemptError}
                        onCloseAttempt={() => setSelectedAttemptId(null)}
                        onRetake={() => {
                          setQuizResult(null);
                          setQuizStarted(false);
                          setShowOnlyQuiz(false);
                          setCurrentQuestionIndex(0);
                          setSelectedAnswers({});
                          setSelectedAttemptId(null);
                          setQuizSubmitError("");
                        }}
                      />

                    ) : !quizStarted ? (
                      /* =====================================================
                         QUIZ INTRO
                      ====================================================== */
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
                          className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {quizQuestionsLoading
                            ? "Loading Questions..."
                            : "Start Quiz"}
                        </button>
                      </div>
                    ) : (
                      /* =====================================================
                         QUIZ QUESTIONS
                      ====================================================== */
                      <div>
                        {/* Quiz Header */}
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
                                  width: `${((currentQuestionIndex + 1) /
                                    questions.length) *
                                    100
                                    }%`,
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Question */}
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

                            {/* Options */}
                            <div className="mt-4 space-y-2">
                              {currentQuestion.options?.map(
                                (option, optionIndex) => {
                                  const isSelected =
                                    selectedAnswers[
                                    currentQuestion._id
                                    ] === option._id;

                                  return (
                                    <label
                                      key={
                                        option._id || optionIndex
                                      }
                                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-200 ${isSelected
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
                                          handleAnswerSelect(
                                            option._id
                                          )
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

                            {/* Navigation */}
                            <div className="mt-6 flex items-center justify-between gap-4">
                              <p className="text-xs text-text-muted">
                                {hasSelectedAnswer
                                  ? "Answer selected"
                                  : "Select an answer to continue"}
                              </p>

                              <button
                                type="button"
                                disabled={
                                  !hasSelectedAnswer ||
                                  quizSubmitting
                                }
                                onClick={
                                  isLastQuestion
                                    ? handleSubmitQuiz
                                    : handleNextQuestion
                                }
                                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isLastQuestion
                                  ? quizSubmitting
                                    ? "Submitting..."
                                    : "Submit Quiz"
                                  : "Next"}
                              </button>
                            </div>
                            {quizSubmitError && (
                              <p className="mt-3 text-sm text-error" role="alert">
                                {quizSubmitError}
                              </p>
                            )}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                );

              case "tool": {
                const tool = toolRegistry.find(
                  (item) => item.id === block.data?.toolId
                );

                return (
                  <div
                    key={block._id}
                    className="lg:col-span-5 rounded-xl border border-border bg-surface p-5"
                  >
                    {tool ? (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Learning tool
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-text-primary">
                          {tool.name}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-text-muted">
                          {tool.description}
                        </p>
                        <Link
                          to={`/tools/${tool.id}`}
                          className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                        >
                          Open tool
                        </Link>
                      </>
                    ) : (
                      <p className="text-sm text-text-muted" role="status">
                        This learning tool is unavailable.
                      </p>
                    )}
                  </div>
                );
              }

              default:
                return (
                  <p
                    key={block._id}
                    className="lg:col-span-12 rounded-lg border border-border p-4 text-sm text-text-muted"
                    role="status"
                  >
                    This lesson contains an unsupported content block.
                  </p>
                );
            }
          })
        )}
      </div >
    </Card >
  );
};
