import Link from "next/link";
import {
  BookOpen,
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
  ArrowRight,
  Clock,
} from "lucide-react";
import { getModules } from "@/lib/content";
import { DIFFICULTY_COLORS } from "@/lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "12 modules covering Python, JavaScript, C++, and Java from beginner fundamentals to advanced system design.",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={24} />,
  Layers: <Layers size={24} />,
  Boxes: <Boxes size={24} />,
  GitBranch: <GitBranch size={24} />,
  Workflow: <Workflow size={24} />,
  Database: <Database size={24} />,
  Globe: <Globe size={24} />,
  GitPullRequest: <GitPullRequest size={24} />,
  Brain: <Brain size={24} />,
  Cpu: <Cpu size={24} />,
  Network: <Network size={24} />,
  Rocket: <Rocket size={24} />,
};

export default function CurriculumPage() {
  const modules = getModules();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Curriculum</h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          A structured path from your first line of code to designing scalable
          systems. Each module includes interactive lessons with code you can run
          in Python, JavaScript, C++, and Java.
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-4 mb-8 text-sm text-[var(--muted-foreground)]">
        <span className="font-medium text-[var(--foreground)]">
          {modules.length} Modules
        </span>
        <span>&middot;</span>
        <span>
          {modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)}{" "}
          Lessons
        </span>
        <span>&middot;</span>
        <span className="flex items-center gap-1">
          <Clock size={14} />~
          {modules.reduce((sum, m) => sum + m.estimatedHours, 0)} hours total
        </span>
      </div>

      <div className="space-y-6">
        {modules.map((mod) => (
          <div
            key={mod.slug}
            className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden"
          >
            {/* Module header */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
                  {ICON_MAP[mod.icon] || <BookOpen size={24} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm text-[var(--muted-foreground)]">
                      Module {mod.order}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[mod.difficulty]}`}
                    >
                      {mod.difficulty}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                      <Clock size={12} />~{mod.estimatedHours}h
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold">{mod.title}</h2>
                  <p className="text-[var(--muted-foreground)] mt-1">
                    {mod.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Lessons list */}
            {mod.lessons && mod.lessons.length > 0 && (
              <div className="border-t border-[var(--border)] bg-[var(--muted)]/50">
                <div className="divide-y divide-[var(--border)]">
                  {mod.lessons.map((lesson, idx) => (
                    <Link
                      key={lesson.slug}
                      href={`/lesson/${mod.slug}/${lesson.slug}`}
                      className="flex items-center gap-4 px-6 py-3 hover:bg-[var(--muted)] transition-colors group"
                    >
                      <span className="w-6 h-6 rounded-full bg-[var(--border)] flex items-center justify-center text-xs font-medium shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium group-hover:text-brand-500 transition-colors">
                          {lesson.title}
                        </span>
                        <p className="text-sm text-[var(--muted-foreground)] truncate">
                          {lesson.description}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-[var(--muted-foreground)] group-hover:text-brand-500 transition-colors shrink-0"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {(!mod.lessons || mod.lessons.length === 0) && (
              <div className="border-t border-[var(--border)] px-6 py-4 text-sm text-[var(--muted-foreground)] italic">
                Lessons coming soon
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
