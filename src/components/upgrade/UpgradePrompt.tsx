"use client";

import Link from "next/link";
import { Lock, ArrowRight, Sparkles, Zap } from "lucide-react";

interface UpgradePromptProps {
  variant: "lesson-gate" | "quiz-limit" | "inline-nudge" | "module-gate";
  moduleName?: string;
  subjectName?: string;
}

export function UpgradePrompt({
  variant,
  moduleName,
  subjectName,
}: UpgradePromptProps) {
  if (variant === "lesson-gate") {
    return (
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="bg-gradient-to-br from-brand-950 to-zinc-950 p-8 sm:p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mx-auto mb-5">
            <Lock size={24} className="text-brand-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Keep going with {moduleName || "this module"}
          </h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
            You&apos;ve completed the free lessons in this module. Unlock the
            rest for just $0.99, or get full access to{" "}
            {subjectName || "all subjects"} with a plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-950 rounded-full text-sm font-bold hover:bg-zinc-100 transition-colors"
            >
              Unlock for $0.99
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-white/[0.15] text-white hover:bg-white/[0.05] transition-colors"
            >
              See all plans
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "module-gate") {
    return (
      <div className="rounded-2xl border border-brand-500/20 bg-brand-500/[0.03] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-brand-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold mb-1">
              Unlock {moduleName || "this module"}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              This module is part of the {subjectName || "full"} path. Get
              access starting at $0.99 per module, or $4.99/month for the
              complete subject.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-xs font-semibold transition-colors"
              >
                View pricing <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "quiz-limit") {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-6 text-center">
        <Zap size={28} className="text-brand-500 mx-auto mb-3" />
        <h3 className="font-bold mb-1">
          Want more practice?
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-4 max-w-sm mx-auto">
          Missed a few questions? StudyItAll Plus gives you AI-powered
          explanations and practice sets generated from your mistakes.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-semibold transition-colors"
        >
          Explore Plus <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // inline-nudge (subtle banner)
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-500/[0.04] border border-brand-500/10">
      <Sparkles size={16} className="text-brand-500 shrink-0" />
      <p className="text-sm text-[var(--muted-foreground)] flex-1">
        <span className="font-semibold text-[var(--foreground)]">
          Enjoying the lesson?
        </span>{" "}
        Unlock the full {subjectName || "curriculum"} from $4.99/mo.
      </p>
      <Link
        href="/pricing"
        className="text-xs font-semibold text-brand-500 hover:text-brand-600 shrink-0"
      >
        See plans &rarr;
      </Link>
    </div>
  );
}
