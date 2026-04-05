"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { signIn } from "next-auth/react";

interface MarkCompleteButtonProps {
  moduleSlug: string;
  lessonSlug: string;
}

export function MarkCompleteButton({ moduleSlug, lessonSlug }: MarkCompleteButtonProps) {
  const { isAuthenticated, loading, isComplete, markComplete } = useProgress();
  const [saving, setSaving] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)]">
        <CheckCircle2 size={18} className="text-[var(--muted-foreground)]" />
        <p className="text-sm text-[var(--muted-foreground)] flex-1">
          <button
            onClick={() => signIn()}
            className="font-semibold text-brand-500 hover:text-brand-600"
          >
            Sign in
          </button>{" "}
          to track your progress and build streaks.
        </p>
      </div>
    );
  }

  const completed = isComplete(moduleSlug, lessonSlug) || justCompleted;

  if (completed) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <CheckCircle2 size={18} className="text-emerald-500" />
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          Lesson complete
        </span>
      </div>
    );
  }

  const handleComplete = async () => {
    setSaving(true);
    await markComplete(moduleSlug, lessonSlug);
    setJustCompleted(true);
    setSaving(false);
  };

  return (
    <button
      onClick={handleComplete}
      disabled={saving}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors disabled:opacity-60"
    >
      {saving ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <CheckCircle2 size={16} />
          Mark as complete
        </>
      )}
    </button>
  );
}
