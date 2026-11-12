export const getQuizAnswerReviewData = (answer, questions = []) => {
  const review = answer || {};
  const questionId =
    typeof review.question === "object"
      ? review.question?._id
      : review.question;
  const question =
    typeof review.question === "object" && review.question !== null
      ? review.question
      : questions.find(
          (item) => item._id?.toString() === questionId?.toString()
        );
  const selectedOptionId =
    typeof review.selectedOption === "object"
      ? review.selectedOption?._id
      : review.selectedOption;
  const selectedOption =
    typeof review.selectedOption === "object" &&
    review.selectedOption !== null
      ? review.selectedOption
      : question?.options?.find(
          (option) =>
            option._id?.toString() === selectedOptionId?.toString()
        );

  return {
    questionId,
    questionText: question?.question || question?.text || "Question unavailable",
    selectedAnswerText: selectedOption?.text || "Answer unavailable",
    correctAnswerText: review.correctOption?.text || "",
    isCorrect: review.isCorrect === true,
  };
};
