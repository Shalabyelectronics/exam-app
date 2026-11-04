import type {ReactNode} from "react";
import {cookies} from "next/headers"
import Link from "next/link";
import {signOut} from "@/app/logout";
import { redirect } from "next/navigation";
export default async function StudyLayout({
    children,
}:{
    children: ReactNode;
}){
    const cookieStore = await cookies();
    const token = cookieStore.get("exam_token")?.value;
    if (!token){
        redirect("/login");
    }
    return (
    <>
        <nav>
            <Link href="/diplomas">Exam App</Link>
            <form action={signOut}>
                <button type="submit">Sign out</button>
            </form>
        </nav>
        {children}
    </>
    );
}
