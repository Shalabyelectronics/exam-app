"use client";
import type { Question } from "@/lib/types";
import { useState } from "react";
import useCountdown from "@/features/questions/hooks/use-countdown";

export default function ExamRunner({
  questions,
  examId,
  duration,
}: {
  questions: Question[];
  examId: string;
  duration: number;
}) {
  //States
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const clock = useCountdown(examId, duration);
  if (!questions.length) return <p>This exam has no questions.</p>;

  return (
    <>
      <p role="timer">
        {clock === null
          ? "Preparing timer..."
          : `${Math.floor(clock.remaining / 60)}:${String(clock.remaining % 60).padStart(2, "0")}`}
      </p>
      {questions.map((question, index) => (
        <fieldset key={question.id} hidden={index !== current}>
          <legend>{question.text}</legend>
          {question.answers.map((answer) => (
            <div key={answer.id}>
              <input
                id={answer.id}
                type="radio"
                value={answer.id}
                name={question.id}
                checked={answers[question.id] === answer.id}
                onChange={() =>
                  setAnswers((prev) => ({ ...prev, [question.id]: answer.id }))
                }
              />
              <label htmlFor={answer.id}>{answer.text}</label>
            </div>
          ))}
        </fieldset>
      ))}
      <progress
        aria-label="Questions answered"
        max={questions.length}
        value={Object.keys(answers).length}
      ></progress>
      <p>{`${Object.keys(answers).length} of ${questions.length} answered`}</p>
      <p>{`Question ${current + 1} of ${questions.length}`}</p>
      <button
        type="button"
        disabled={current === 0}
        onClick={() => setCurrent((prev) => prev - 1)}
      >
        Previous
      </button>
      <button
        type="button"
        disabled={current === questions.length - 1}
        onClick={() => setCurrent((prev) => prev + 1)}
      >
        Next
      </button>
    </>
  );
}
