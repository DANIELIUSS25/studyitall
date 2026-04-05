import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Chess Free — Strategy & Openings | StudyItAll.com",
  description:
    "Learn chess from beginner to advanced. Master openings, tactics, strategy, and endgames with structured lessons. Free on StudyItAll.com.",
  alternates: { canonical: "https://studyitall.com/learn/chess" },
};

export default function LearnChessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        Learn Chess
      </h1>
      <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed">
        Chess sharpens your mind like nothing else. Learn the rules, master
        common openings, develop tactical vision, and understand the strategic
        principles that separate beginners from intermediate players.
      </p>

      <div className="mt-8 space-y-3">
        {[
          "From absolute beginner to intermediate in 10 structured topics",
          "Learn the most popular openings (Italian, Sicilian, Queen's Gambit)",
          "Tactical patterns: forks, pins, skewers, discovered attacks",
          "Endgame fundamentals every player must know",
          "Famous game analysis to build your chess intuition",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="text-xl font-bold">Curriculum</h2>
        <div className="space-y-px rounded-xl border border-[var(--border)] overflow-hidden">
          {[
            "The rules of chess — how each piece moves",
            "Piece values and basic checkmates",
            "Opening principles — control the center, develop pieces, castle",
            "Italian Game, Sicilian Defense, Queen's Gambit",
            "Tactical patterns — forks, pins, skewers, double attacks",
            "Positional play and pawn structure",
            "Middlegame strategy — planning and evaluation",
            "Endgame fundamentals — king and pawn, rook endings",
            "Calculation and visualization training",
            "Famous games and what they teach",
          ].map((topic, i) => (
            <div key={topic} className="flex items-center gap-3 px-4 py-3 bg-[var(--card)]">
              <span className="text-xs font-bold text-[var(--muted-foreground)] w-5 text-right tabular-nums">{i + 1}</span>
              <span className="text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-[var(--muted)] text-sm text-[var(--muted-foreground)]">
        Chess lessons are coming soon. In the meantime, sharpen your mind with
        our coding curriculum — algorithmic thinking is the same muscle.
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/subjects/chess"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          View chess topics
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/coding"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
        >
          Try coding instead
        </Link>
      </div>
    </div>
  );
}
