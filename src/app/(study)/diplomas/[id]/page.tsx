import Link from "next/link";
import {api} from "@/lib/api";
import type {Exam, Paged} from "@/lib/types";
export default async function ExamsPage({
    params,
}:{
    params: Promise<{id:string}>;
}){
    const {id} = await params;
    const result = await api<{payload:Paged<Exam>}>(
            `/api/exams?diplomaId=${encodeURIComponent(id)}&page=1&limit=12`,

    );
    return(
        <>
        <Link href="/diplomas">Back to diplomas</Link>
        <h2>Choose an exame</h2>
        <ul>
            {result.payload.data.map((exam)=>(
                <li key={exam.id}>
                    <h3>{exam.title}</h3>
                    <p>
                        {exam.duration} minutes . {exam.questionsCount} questions
                    </p>
                    <Link href={`/exams/${exam.id}`}>
                    Start exam
                    </Link>
                </li>
            ))}
        </ul>
        {result.payload.data.length === 0 && <p>No exams for this diploma.</p>}
        </>
    )
}