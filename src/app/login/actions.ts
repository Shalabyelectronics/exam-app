"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(_previous: { error: string }, form: FormData) {
  const username = String(form.get("username") ?? "").trim();
  const password = String(form.get("password") ?? "");

  if (!username || !password) {
    return { error: "Enter username and password." };
  }

  let token: string;
  try {
    const response = await fetch(process.env.EXAM_API_URL + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
    const data = await response.json();

    if (!response.ok || typeof data.payload?.token !== "string" || !data.payload.token) {
      return {
        error:
          response.status === 403
            ? "Verify your email first."
            : "Sign-in failed. Check your credentials.",
      };
    }
    token = data.payload.token;
    
  } catch {
    return { error: "Cannot reach the sign-in service." };
  }

  (await cookies()).set("exam_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  redirect("/diplomas");
}
