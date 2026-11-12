import assert from "node:assert/strict";
import test from "node:test";
import { getQuizAnswerReviewData } from "./quizAnswerReviewData.js";

test("resolves submitted answer IDs using the public quiz question data", () => {
  const review = getQuizAnswerReviewData(
    {
      question: "question-1",
      selectedOption: "option-2",
      isCorrect: false,
      correctOption: { _id: "option-1", text: "Correct choice" },
    },
    [
      {
        _id: "question-1",
        question: "Question from the quiz",
        options: [
          { _id: "option-1", text: "Correct choice" },
          { _id: "option-2", text: "Selected choice" },
        ],
      },
    ]
  );

  assert.deepEqual(review, {
    questionId: "question-1",
    questionText: "Question from the quiz",
    selectedAnswerText: "Selected choice",
    correctAnswerText: "Correct choice",
    isCorrect: false,
  });
});

test("reads populated historical answer data", () => {
  const review = getQuizAnswerReviewData({
    question: { _id: "question-1", text: "Historical question" },
    selectedOption: { _id: "option-2", text: "Historical selection" },
    correctOption: { _id: "option-1", text: "Historical correct answer" },
    isCorrect: true,
  });

  assert.deepEqual(review, {
    questionId: "question-1",
    questionText: "Historical question",
    selectedAnswerText: "Historical selection",
    correctAnswerText: "Historical correct answer",
    isCorrect: true,
  });
});

test("handles deleted question or option references explicitly", () => {
  const review = getQuizAnswerReviewData({
    question: "missing-question",
    selectedOption: "missing-option",
  });

  assert.deepEqual(review, {
    questionId: "missing-question",
    questionText: "Question unavailable",
    selectedAnswerText: "Answer unavailable",
    correctAnswerText: "",
    isCorrect: false,
  });
});
