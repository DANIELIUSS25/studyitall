import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn AI & Machine Learning Free | StudyItAll.com",
  description:
    "Learn artificial intelligence and machine learning from scratch. Neural networks, prompt engineering, and building AI apps. Free on StudyItAll.com.",
  alternates: { canonical: "https://studyitall.com/learn/ai" },
};

export default function LearnAIPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        Learn AI &amp; Machine Learning
      </h1>
      <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed">
        AI is transforming every industry. Understand how machine learning
        works, build neural networks, master prompt engineering, and learn to
        deploy real AI applications — all from scratch.
      </p>

      <div className="mt-8 space-y-3">
        {[
          "No math prerequisites — we teach what you need as you go",
          "Python-based curriculum (the standard language for AI)",
          "Hands-on projects: train models, not just read about them",
          "Covers ChatGPT-era skills: prompt engineering, AI app development",
          "From fundamentals to deploying real models",
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
            "What is AI? — types, history, and current state",
            "Machine learning fundamentals — supervised vs unsupervised",
            "Data preprocessing and feature engineering",
            "Neural networks and deep learning",
            "Natural language processing (NLP)",
            "Computer vision basics",
            "Prompt engineering for large language models",
            "Building AI-powered applications",
            "Ethics, bias, and responsible AI",
            "Deploying ML models to production",
          ].map((topic, i) => (
            <div key={topic} className="flex items-center gap-3 px-4 py-3 bg-[var(--card)]">
              <span className="text-xs font-bold text-[var(--muted-foreground)] w-5 text-right tabular-nums">{i + 1}</span>
              <span className="text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-[var(--muted)] text-sm text-[var(--muted-foreground)]">
        AI lessons are coming soon. Start with our Python coding curriculum to
        build the foundation you&apos;ll need.
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/subjects/ai"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          View AI topics
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/coding"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
        >
          Start with Python
        </Link>
      </div>
    </div>
  );
}
