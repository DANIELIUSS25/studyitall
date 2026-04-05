"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Trophy,
  Star,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface DashboardData {
  completedLessons: string[];
  quizScores: Record<string, { score: number; total: number; bestScore: number; date: string }>;
  streak: { current: number; longest: number };
  xp: number;
  recentActivity: string[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
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
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-[var(--muted)] rounded" />
          <div className="h-24 bg-[var(--muted)] rounded-xl" />
          <div className="h-24 bg-[var(--muted)] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <BookOpen size={32} className="mx-auto text-[var(--muted-foreground)] mb-4" />
        <h1 className="text-2xl font-bold mb-2">Sign in to see your dashboard</h1>
        <p className="text-[var(--muted-foreground)] mb-6">
          Track your progress, streaks, and quiz scores.
        </p>
        <button
          onClick={() => signIn()}
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-semibold transition-colors"
        >
          Sign in
        </button>
      </div>
    );
  }

  const stats = [
    {
      label: "Current streak",
      value: data?.streak.current || 0,
      suffix: data?.streak.current === 1 ? "day" : "days",
      icon: <Flame size={20} />,
      color: "text-orange-500 bg-orange-500/10",
    },
    {
      label: "Longest streak",
      value: data?.streak.longest || 0,
      suffix: "days",
      icon: <Trophy size={20} />,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Total XP",
      value: data?.xp || 0,
      suffix: "xp",
      icon: <Star size={20} />,
      color: "text-brand-500 bg-brand-500/10",
    },
    {
      label: "Lessons completed",
      value: data?.completedLessons.length || 0,
      suffix: "",
      icon: <CheckCircle2 size={20} />,
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ];

  const quizEntries = data?.quizScores ? Object.entries(data.quizScores) : [];

  // Activity heatmap — last 30 days
  const activitySet = new Set(data?.recentActivity || []);
  const heatmapDays: { date: string; active: boolean }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    heatmapDays.push({ date: dateStr, active: activitySet.has(dateStr) });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {session.user.image ? (
          <img // eslint-disable-line @next/next/no-img-element
            src={session.user.image}
            alt=""
            className="w-12 h-12 rounded-full border border-[var(--border)]"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-lg">
            {(session.user.name || "U")[0].toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold">{session.user.name}</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            {session.user.email}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4"
          >
            <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
              {s.icon}
            </div>
            <p className="text-2xl font-black tabular-nums">{s.value}</p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Activity heatmap */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 mb-8">
        <h2 className="text-sm font-bold mb-3">Last 30 days</h2>
        <div className="flex gap-1 flex-wrap">
          {heatmapDays.map((day) => (
            <div
              key={day.date}
              title={day.date}
              className={`w-4 h-4 rounded-sm ${
                day.active
                  ? "bg-emerald-500"
                  : "bg-[var(--muted)]"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-2">
          {activitySet.size} active {activitySet.size === 1 ? "day" : "days"} this month
        </p>
      </div>

      {/* Completed lessons */}
      {data && data.completedLessons.length > 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden mb-8">
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-sm font-bold">Completed lessons</h2>
            <span className="text-xs text-[var(--muted-foreground)]">
              {data.completedLessons.length} total
            </span>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {data.completedLessons.slice(0, 10).map((key) => {
              const [mod, les] = key.split("/");
              return (
                <Link
                  key={key}
                  href={`/lesson/${mod}/${les}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--muted)] transition-colors"
                >
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span className="truncate">{les.replace(/-/g, " ").replace(/lesson \d+ /, "")}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz scores */}
      {quizEntries.length > 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden mb-8">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <h2 className="text-sm font-bold">Quiz scores</h2>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {quizEntries.map(([id, data]) => (
              <div key={id} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium">{id.replace(/-/g, " ")}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[var(--muted-foreground)]">
                    Latest: {Math.round((data.score / data.total) * 100)}%
                  </span>
                  <span className="font-bold text-amber-500 flex items-center gap-0.5">
                    <Trophy size={10} />
                    Best: {Math.round((data.bestScore / data.total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {(!data || (data.completedLessons.length === 0 && quizEntries.length === 0)) && (
        <div className="text-center py-8">
          <p className="text-[var(--muted-foreground)] mb-4">
            No progress yet. Start a lesson or take a quiz!
          </p>
          <Link
            href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-semibold transition-colors"
          >
            Start first lesson
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
