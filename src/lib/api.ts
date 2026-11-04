import "server-only";

import { cookies } from "next/headers";

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = (await cookies()).get("exam_token")?.value;
  if (!token) throw new Error("Please sign in again.");

  const headers = new Headers(init.headers);
  headers.set("Authorization", "Bearer " + token);
  if (init.body) headers.set("Content-Type", "application/json");

  const response = await fetch(process.env.EXAM_API_URL + path, {
    ...init,
    headers,
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      response.status === 401
        ? "Session expired. Please sign in again."
        : "The exam service request failed.",
    );
  }
  if (data === null) throw new Error("The exam service returned no JSON.");

  return data as T;
}
