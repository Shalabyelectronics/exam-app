import Link from "next/link";
import { api } from "@/lib/api";
import type { Exam, Paged } from "@/lib/types";
import Pager from "@/components/pager";
export default async function ExamsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const result = await api<{ payload: Paged<Exam> }>(
    `/api/exams?diplomaId=${encodeURIComponent(id)}&page=${currentPage}&limit=12`,
  );
  // throw new Error("Oops something went wrong");
  return (
    <>
      <Link href="/diplomas">Back to diplomas</Link>
      <h2>Choose an exame</h2>
      <ul>
        {result.payload.data.map((exam) => (
          <li key={exam.id}>
            <h3>{exam.title}</h3>
            <p>
              {exam.duration} minutes . {exam.questionsCount} questions
            </p>
            <Link href={`/exams/${exam.id}`}>Start exam</Link>
          </li>
        ))}
      </ul>
      {result.payload.data.length === 0 && <p>No exams for this diploma.</p>}
      <Pager metadata={result.payload.metadata} />
    </>
  );
}
