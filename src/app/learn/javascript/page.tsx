import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn JavaScript Free — Interactive Lessons | StudyItAll.com",
  description:
    "Learn JavaScript programming for free with interactive lessons and a live code editor. Build websites, web apps, and full-stack projects. No sign-up required.",
  alternates: { canonical: "https://studyitall.com/learn/javascript" },
};

export default function LearnJavaScriptPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        Learn JavaScript
      </h1>
      <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed">
        JavaScript is the language of the web. Every website you visit uses it.
        Learn to build interactive web pages, web apps, and full-stack
        applications with our free interactive lessons.
      </p>

      <div className="mt-8 space-y-3">
        {[
          "Run JavaScript directly in your browser — zero setup",
          "See the same concepts in Python, C++, and Java side-by-side",
          "Audio narration on every lesson",
          "From console.log to async/await and DOM manipulation",
          "12 modules covering fundamentals through system design",
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
            "Variables (let, const), data types, and operators",
            "Conditionals, loops, and control flow",
            "Functions, arrow functions, and closures",
            "Arrays, objects, and modern ES6+ methods",
            "DOM manipulation and event handling",
            "Asynchronous JavaScript (promises, async/await)",
            "Object-oriented and functional patterns",
            "Building real web applications",
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
          Start JavaScript lesson 1
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
