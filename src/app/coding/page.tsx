import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Layers,
  Boxes,
  GitBranch,
  Workflow,
  Database,
  Globe,
  GitPullRequest,
  Brain,
  Cpu,
  Network,
  Rocket,
  ChevronRight,
} from "lucide-react";
import { getModules } from "@/lib/content";
import { DIFFICULTY_COLORS } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Coding",
  description:
    "Master Python, JavaScript, C++, and Java with interactive lessons, live code execution, and audio narration.",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={20} />,
  Layers: <Layers size={20} />,
  Boxes: <Boxes size={20} />,
  GitBranch: <GitBranch size={20} />,
  Workflow: <Workflow size={20} />,
  Database: <Database size={20} />,
  Globe: <Globe size={20} />,
  GitPullRequest: <GitPullRequest size={20} />,
  Brain: <Brain size={20} />,
  Cpu: <Cpu size={20} />,
  Network: <Network size={20} />,
  Rocket: <Rocket size={20} />,
};

export default function CodingPage() {
  const modules = getModules();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {["Python", "JavaScript", "C++", "Java"].map((l) => (
                <span
                  key={l}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--muted)] border border-[var(--border)]"
                >
                  {l}
                </span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Learn to code,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-violet-500">
                for real
              </span>
            </h1>

            <p className="mt-5 text-lg text-[var(--muted-foreground)] leading-relaxed max-w-lg">
              12 modules. Four languages. A live code editor in every lesson.
              From your first line of code to designing scalable systems.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold text-sm transition-all hover:shadow-lg hover:shadow-brand-500/25"
              >
                Start Lesson 1
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
              >
                Full curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                12 modules
              </h2>
              <p className="mt-1 text-[var(--muted-foreground)]">
                240+ hours &middot; Beginner to advanced
              </p>
            </div>
            <Link
              href="/curriculum"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-semibold transition-colors"
            >
              View details <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.slug}
                href={
                  mod.lessons && mod.lessons.length > 0
                    ? `/lesson/${mod.slug}/${mod.lessons[0].slug}`
                    : "/curriculum"
                }
                className="group flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0 mt-0.5">
                  {ICON_MAP[mod.icon] || <BookOpen size={20} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                      Module {mod.order}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase ${DIFFICULTY_COLORS[mod.difficulty]}`}
                    >
                      {mod.difficulty}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm group-hover:text-brand-500 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[var(--border)] group-hover:text-brand-500 shrink-0 mt-1 transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--muted)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to write code?
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Your first lesson is 30 seconds away. No setup required.
          </p>
          <Link
            href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-brand-500/25"
          >
            Start Your First Lesson
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
