"use client";
import { useState, useEffect } from "react";
export default function useCountdown(examId: string, duration: number) {
  const [clock, setClock] = useState<{
    remaining: number;
    startedAt: string;
  } | null>(null);
  useEffect(() => {
    let start = Date.now();
    const key = `exam-clock:${examId}`;
    try {
      const stored = Number(sessionStorage.getItem(key));
      if (Number.isFinite(stored) && stored > 0 && stored <= start) {
        start = stored;
      }
      sessionStorage.setItem(key, String(start));
    } catch {}
    const deadline = start + duration * 60_000;
    function tick() {
      const remaining = Math.max(Math.ceil((deadline - Date.now()) / 1000), 0);
      setClock({ remaining, startedAt: new Date(start).toISOString() });
    }
    tick();
    const intervalID = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalID);
  }, [examId, duration]);

  return clock;
}
