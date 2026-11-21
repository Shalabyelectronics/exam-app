"use client";
import type { Question } from "@/lib/types";
import { useState } from "react";

export default function ExamRunner({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!questions.length) return <p>This exam has no questions.</p>;

  return (
    <>
      {questions.map((question) => (
        <fieldset key={question.id}>
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
    </>
  );
}
