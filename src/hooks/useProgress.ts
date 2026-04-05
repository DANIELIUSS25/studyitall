"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

interface ProgressData {
  completedLessons: string[];
  xp: number;
  streak: { current: number; longest: number };
}

export function useProgress() {
  const { data: session } = useSession();
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setData(null);
      setLoading(false);
      return;
    }

    fetch("/api/progress/summary")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session]);

  const isComplete = useCallback(
    (moduleSlug: string, lessonSlug: string) => {
      if (!data) return false;
      return data.completedLessons.includes(`${moduleSlug}/${lessonSlug}`);
    },
    [data]
  );

  const markComplete = useCallback(
    async (moduleSlug: string, lessonSlug: string) => {
      const res = await fetch("/api/progress/complete-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleSlug, lessonSlug }),
      });
      const result = await res.json();
      if (result.success) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                completedLessons: [...prev.completedLessons, `${moduleSlug}/${lessonSlug}`],
                xp: result.xp,
                streak: result.streak,
              }
            : prev
        );
      }
      return result;
    },
    []
  );

  return {
    isAuthenticated: !!session?.user,
    loading,
    data,
    isComplete,
    markComplete,
  };
}
