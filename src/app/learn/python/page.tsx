import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Python Free — Interactive Lessons | StudyItAll.com",
  description:
    "Learn Python programming for free with interactive lessons, a live code editor, and audio narration. From variables and loops to data structures and OOP. No sign-up required.",
  alternates: { canonical: "https://studyitall.com/learn/python" },
};

export default function LearnPythonPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        Learn Python
      </h1>
      <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed">
        Python is the most popular programming language for beginners, data
        science, AI, and automation. Our free interactive lessons take you from
        your first line of code to building real applications.
      </p>

      <div className="mt-8 space-y-3">
        {[
          "Write and run Python code in your browser",
          "No downloads, no setup, no account required",
          "Audio narration on every lesson",
          "Compare with JavaScript, C++, and Java side-by-side",
          "Covers variables, loops, functions, OOP, data structures, and algorithms",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="text-xl font-bold">What you&apos;ll learn</h2>
        <div className="space-y-px rounded-xl border border-[var(--border)] overflow-hidden">
          {[
            "Variables, data types, and expressions",
            "Conditionals (if/elif/else) and loops (for/while)",
            "Functions, scope, and return values",
            "Lists, dictionaries, sets, and tuples",
            "Object-oriented programming with classes",
            "File I/O and error handling",
            "Sorting algorithms and Big-O notation",
            "Building real projects",
          ].map((topic, i) => (
            <div key={topic} className="flex items-center gap-3 px-4 py-3 bg-[var(--card)]">
              <span className="text-xs font-bold text-[var(--muted-foreground)] w-5 text-right tabular-nums">{i + 1}</span>
              <span className="text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Start Python lesson 1
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/curriculum"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
        >
          Full curriculum
        </Link>
      </div>
    </div>
  );
}
