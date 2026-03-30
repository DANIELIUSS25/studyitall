import Link from "next/link";
import {
  Code2,
  Calculator,
  FlaskConical,
  Landmark,
  BookText,
  Languages,
  ArrowRight,
  Play,
  Headphones,
  Sparkles,
  GraduationCap,
  Target,
} from "lucide-react";
import { SUBJECTS } from "@/lib/subjects";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={32} />,
  Calculator: <Calculator size={32} />,
  FlaskConical: <FlaskConical size={32} />,
  Landmark: <Landmark size={32} />,
  BookText: <BookText size={32} />,
  Languages: <Languages size={32} />,
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-purple-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-sm font-medium mb-6">
              <Sparkles size={16} />
              Free &middot; Interactive &middot; All Subjects
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Study It{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-500">
                All.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--muted-foreground)] mb-10 max-w-2xl mx-auto">
              One platform. Every subject. Master coding, math, science, history,
              English, and more with interactive lessons, audio narration, and
              hands-on practice.
            </p>
          </div>
        </div>
      </section>

      {/* Subject Grid — the main hub */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-2">Choose a Subject</h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            Pick what you want to learn. Every subject has structured lessons from
            beginner to advanced.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUBJECTS.map((subject) => {
              const href =
                subject.slug === "coding"
                  ? "/coding"
                  : `/subjects/${subject.slug}`;

              return (
                <Link
                  key={subject.slug}
                  href={href}
                  className="group relative bg-[var(--card)] rounded-2xl border border-[var(--border)] hover:border-transparent overflow-hidden transition-all hover:shadow-lg hover:shadow-brand-500/5"
                >
                  {/* Gradient top bar */}
                  <div
                    className={`h-1.5 bg-gradient-to-r ${subject.gradient}`}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center text-white`}
                      >
                        {ICON_MAP[subject.icon]}
                      </div>
                      {subject.comingSoon && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-medium">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-brand-500 transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-brand-400 font-medium mb-2">
                      {subject.tagline}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-2">
                      {subject.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {subject.topicCount} topics
                        {subject.lessonCount > 0 &&
                          ` \u00b7 ${subject.lessonCount}+ lessons`}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-[var(--muted-foreground)] group-hover:text-brand-500 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">
            How StudyItAll Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Target size={24} />,
                title: "Structured Paths",
                desc: "Each subject follows a clear beginner-to-advanced curriculum. No guessing what to learn next.",
                color: "bg-brand-500/10 text-brand-500",
              },
              {
                icon: <Play size={24} />,
                title: "Interactive Practice",
                desc: "Run code in your browser, solve practice problems, and test yourself with quizzes.",
                color: "bg-green-500/10 text-green-500",
              },
              {
                icon: <Headphones size={24} />,
                title: "Audio Lessons",
                desc: "Every lesson has audio narration. Learn on the go — while commuting, walking, or relaxing.",
                color: "bg-purple-500/10 text-purple-500",
              },
              {
                icon: <GraduationCap size={24} />,
                title: "All Levels",
                desc: "Whether you're a complete beginner or brushing up for exams, there's a path for you.",
                color: "bg-amber-500/10 text-amber-500",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured: Coding — showcase the active section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-brand-500/20 rounded-2xl p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-sm font-medium mb-4">
                  <Sparkles size={14} />
                  Now Available
                </div>
                <h2 className="text-3xl font-bold mb-3">
                  Coding — Learn 4 Languages
                </h2>
                <p className="text-[var(--muted-foreground)] mb-6">
                  Our flagship subject. 12 modules covering Python, JavaScript,
                  C++, and Java with a live code editor, audio lessons, and
                  projects that build real skills.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {["Python", "JavaScript", "C++", "Java"].map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 rounded-full bg-[var(--muted)] text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <Link
                  href="/coding"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                >
                  Start Learning to Code
                  <ArrowRight size={18} />
                </Link>
              </div>
              <div className="w-full lg:w-auto">
                <div className="bg-gray-950 rounded-xl p-4 font-mono text-sm text-green-400 min-w-[280px]">
                  <div className="text-gray-500 mb-2">
                    # Your first Python program
                  </div>
                  <div>
                    <span className="text-purple-400">print</span>
                    <span className="text-gray-300">(</span>
                    <span className="text-yellow-300">
                      &quot;Hello, World!&quot;
                    </span>
                    <span className="text-gray-300">)</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-800 text-gray-300">
                    <span className="text-gray-500">&gt;</span> Hello, World!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Learning Today</h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            No sign-up, no credit card, no setup. Just pick a subject and start
            learning.
          </p>
          <Link
            href="/coding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium text-lg transition-colors"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
