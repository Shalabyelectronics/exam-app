import { api } from "@/lib/api";
import { Exam, Question } from "@/lib/types";
import ExamRunner from "@/features/questions/components/exam-runner";
export default async function ExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [exam, questions] = await Promise.all([
    api<{ payload: { exam: Exam } }>(`/api/exams/${id}`),
    api<{ payload: { questions: Question[] } }>(`/api/questions/exam/${id}`),
  ]);

  return (
    <>
      <h2>Exam : {exam.payload.exam.title}</h2>
      <p>{exam.payload.exam.description}</p>
      <p>you have {questions.payload.questions.length} questions</p>
      <ExamRunner
        questions={questions.payload.questions}
        key={id}
        examId={id}
        duration={exam.payload.exam.duration}
      />
    </>
  );
}
