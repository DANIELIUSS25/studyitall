import Link from "next/link";
import {
  Code2,
  Play,
  Headphones,
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
  Clock,
} from "lucide-react";
import { getModules } from "@/lib/content";
import { DIFFICULTY_COLORS } from "@/lib/types";

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

export default function Home() {
  const modules = getModules();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-transparent to-purple-600/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-sm font-medium mb-6">
              <Code2 size={16} />
              Free &middot; Interactive &middot; Beginner to Advanced
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Learn to Code.{" "}
              <span className="text-brand-500">Build Anything.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
              Master Python, JavaScript, C++, and Java with interactive lessons,
              a live code editor, and audio narration. From your first
              &ldquo;Hello World&rdquo; to system design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
              >
                Start Learning
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--muted)] hover:bg-[var(--border)] rounded-lg font-medium transition-colors"
              >
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Learn Programming
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
              <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 mb-4">
                <Play size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Code Editor</h3>
              <p className="text-[var(--muted-foreground)]">
                Write and run Python, JavaScript, C++, and Java directly in your
                browser. See results instantly — no setup required.
              </p>
            </div>
            <div className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                <Headphones size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Audio Lessons</h3>
              <p className="text-[var(--muted-foreground)]">
                Every lesson comes with audio narration. Learn while commuting,
                exercising, or whenever you prefer listening.
              </p>
            </div>
            <div className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Structured Curriculum
              </h3>
              <p className="text-[var(--muted-foreground)]">
                12 carefully designed modules take you from zero to professional.
                Each lesson builds on the last with real-world projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            4 Languages. One Curriculum.
          </h2>
          <p className="text-center text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto">
            Every lesson shows you the same concept in all four languages
            side-by-side. Switch between them with a single click.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Python", color: "from-yellow-400 to-blue-500", desc: "Beginner-friendly & versatile" },
              { name: "JavaScript", color: "from-yellow-400 to-yellow-600", desc: "The language of the web" },
              { name: "C++", color: "from-blue-400 to-blue-700", desc: "Performance & systems" },
              { name: "Java", color: "from-red-400 to-orange-500", desc: "Enterprise & Android" },
            ].map((lang) => (
              <div
                key={lang.name}
                className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] text-center"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${lang.color} mx-auto mb-3 flex items-center justify-center text-white font-bold text-sm`}
                >
                  {lang.name.slice(0, 2)}
                </div>
                <h3 className="font-semibold">{lang.name}</h3>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {lang.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum preview */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold">Curriculum</h2>
              <p className="text-[var(--muted-foreground)] mt-2">
                12 modules &middot; 240+ hours &middot; Beginner to Advanced
              </p>
            </div>
            <Link
              href="/curriculum"
              className="hidden sm:inline-flex items-center gap-1 text-brand-500 hover:text-brand-400 font-medium"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Link
                key={mod.slug}
                href={
                  mod.lessons && mod.lessons.length > 0
                    ? `/lesson/${mod.slug}/${mod.lessons[0].slug}`
                    : "/curriculum"
                }
                className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] hover:border-brand-500/50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
                    {ICON_MAP[mod.icon] || <BookOpen size={24} />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[var(--muted-foreground)]">
                        Module {mod.order}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[mod.difficulty]}`}
                      >
                        {mod.difficulty}
                      </span>
                    </div>
                    <h3 className="font-semibold group-hover:text-brand-500 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">
                      {mod.description}
                    </p>
                    <div className="text-xs text-[var(--muted-foreground)] mt-2 flex items-center gap-1">
                      <Clock size={12} />
                      {mod.lessons?.length || 0} lessons &middot; ~
                      {mod.estimatedHours}h
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            Jump into your first lesson. No sign-up, no credit card, no setup.
            Just open and start coding.
          </p>
          <Link
            href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium text-lg transition-colors"
          >
            Start Your First Lesson
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
