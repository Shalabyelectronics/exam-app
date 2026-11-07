"use client";
import { useEffect } from "react";
export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <h1>Error</h1>
      <p>Something went wrong.</p>
      <button onClick={() => retry()}>Try again</button>
    </>
  );
}
