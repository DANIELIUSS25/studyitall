"use client";

import { useSession } from "next-auth/react";
import { Flame } from "lucide-react";
import { useState, useEffect } from "react";

export function StreakBadge() {
  const { data: session } = useSession();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/progress/streak")
      .then((r) => r.json())
      .then((d) => {
        if (d.current) setStreak(d.current);
      })
      .catch(() => {});
  }, [session]);

  if (!session?.user || streak === 0) return null;

  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 text-orange-500">
      <Flame size={14} />
      <span className="text-xs font-bold tabular-nums">{streak}</span>
    </div>
  );
}
