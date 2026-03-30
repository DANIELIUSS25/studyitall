import Link from "next/link";
import {
  Code2,
  Calculator,
  FlaskConical,
  Landmark,
  BookText,
  Languages,
  ArrowRight,
  Headphones,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { SUBJECTS } from "@/lib/subjects";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={28} />,
  Calculator: <Calculator size={28} />,
  FlaskConical: <FlaskConical size={28} />,
  Landmark: <Landmark size={28} />,
  BookText: <BookText size={28} />,
  Languages: <Languages size={28} />,
};

/* ─── Mini mock UI: a fake lesson sidebar for the hero ─── */
function MockLessonCard() {
  const lessons = [
    { title: "What is Programming?", done: true },
    { title: "Variables & Data Types", done: true },
    { title: "Control Flow", active: true },
    { title: "Functions", done: false },
    { title: "Debugging", done: false },
  ];

  return (
    <div className="w-full max-w-xs bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
      {/* card header */}
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <p className="text-xs font-medium text-brand-500 uppercase tracking-wide">
          Module 1
        </p>
        <p className="font-semibold text-sm mt-0.5">
          Programming Fundamentals
        </p>
        {/* progress bar */}
        <div className="mt-3 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
          <div className="h-full w-2/5 rounded-full bg-brand-500" />
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-1.5">
          2 of 5 complete
        </p>
      </div>
      {/* lesson list */}
      <ul className="divide-y divide-[var(--border)]">
        {lessons.map((l) => (
          <li
            key={l.title}
            className={`flex items-center gap-3 px-5 py-3 text-sm ${
              l.active
                ? "bg-brand-50 dark:bg-brand-900/20"
                : ""
            }`}
          >
            {l.done ? (
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            ) : l.active ? (
              <PlayCircle size={16} className="text-brand-500 shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-[var(--border)] shrink-0" />
            )}
            <span
              className={
                l.active
                  ? "font-medium text-brand-600 dark:text-brand-400"
                  : l.done
                  ? "text-[var(--muted-foreground)] line-through"
                  : "text-[var(--muted-foreground)]"
              }
            >
              {l.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* ─────────────── HERO ─────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* left copy */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
                Learn any subject,{" "}
                <span className="text-brand-500">at your own pace</span>
              </h1>
              <p className="mt-5 text-lg text-[var(--muted-foreground)] leading-relaxed">
                Interactive lessons, practice problems, and audio you can take
                anywhere &mdash; all free. No sign-up and no credit card
                required. Just pick a subject and start.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/coding"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
                >
                  Start with Coding
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border border-[var(--border)] hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]"
                >
                  See a sample lesson
                </Link>
              </div>
            </div>

            {/* right: mock lesson UI */}
            <div className="hidden lg:flex justify-center">
              <MockLessonCard />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── CHOOSE A SUBJECT ─────────────── */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Choose a Subject</h2>
          <p className="text-[var(--muted-foreground)] mt-1 mb-8">
            Coding is live now. Math, Science, History, English, and Spanish are
            being added throughout 2026.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUBJECTS.map((subject) => {
              const href =
                subject.slug === "coding"
                  ? "/coding"
                  : `/subjects/${subject.slug}`;
              const isLive = !subject.comingSoon;

              return (
                <Link
                  key={subject.slug}
                  href={href}
                  className={`group relative bg-[var(--card)] rounded-2xl border transition-all ${
                    isLive
                      ? "border-brand-200 dark:border-brand-800 ring-1 ring-brand-100 dark:ring-brand-900 hover:shadow-md"
                      : "border-[var(--border)] opacity-90 hover:opacity-100 hover:shadow-sm"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isLive
                            ? "bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400"
                            : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        {ICON_MAP[subject.icon]}
                      </div>
                      {isLive ? (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">
                          Available
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-medium">
                          2026
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg font-bold mb-1 ${
                        isLive
                          ? "group-hover:text-brand-600 dark:group-hover:text-brand-400"
                          : ""
                      } transition-colors`}
                    >
                      {subject.name}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-2">
                      {subject.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {subject.topicCount} topics
                        {subject.lessonCount > 0 &&
                          ` \u00b7 ${subject.lessonCount}+ lessons`}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-[var(--muted-foreground)] group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">
            How StudyItAll Works
          </h2>
          <p className="text-center text-[var(--muted-foreground)] mb-10 max-w-xl mx-auto">
            Every subject follows the same proven format so you always know what
            to expect.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BookOpen size={22} />,
                title: "Clear lesson paths",
                body: "Each subject is broken into modules that progress from basics to advanced. You always know the next step.",
              },
              {
                icon: <PlayCircle size={22} />,
                title: "Hands-on practice",
                body: "Type real code, solve problems, and get instant feedback right in your browser \u2014 no downloads needed.",
              },
              {
                icon: <Headphones size={22} />,
                title: "Audio narration",
                body: "Every lesson includes a play button so you can listen while commuting, walking, or doing chores.",
              },
              {
                icon: <BarChart3 size={22} />,
                title: "Beginner to advanced",
                body: "Whether you\u2019re starting from zero or reviewing before an exam, there\u2019s a path that fits your level.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CODING SPOTLIGHT ─────────────── */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* left: info */}
              <div className="flex-1 p-8 sm:p-10">
                <span className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                  Available now
                </span>
                <h2 className="text-2xl font-bold mt-2 mb-3">
                  Coding &mdash; 4 Languages, 12 Modules
                </h2>
                <p className="text-[var(--muted-foreground)] mb-5 leading-relaxed">
                  Our flagship subject. Work through structured lessons in
                  Python, JavaScript, C++, and Java with a live code editor,
                  audio narration, and projects that build real skills.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Write and run code directly in your browser",
                    "Understand core concepts like data structures and algorithms",
                    "Build small applications and solve real problems",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[var(--foreground)]"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-green-500 mt-0.5 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "JavaScript", "C++", "Java"].map((l) => (
                    <span
                      key={l}
                      className="px-3 py-1 rounded-full bg-[var(--muted)] text-xs font-medium"
                    >
                      {l}
                    </span>
                  ))}
                </div>

                <Link
                  href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Begin Lesson 1
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* right: mini code snippet */}
              <div className="hidden lg:flex items-center justify-center bg-gray-950 p-10 lg:w-[340px]">
                <div className="font-mono text-sm leading-relaxed">
                  <div className="text-gray-500"># hello.py</div>
                  <div className="mt-1">
                    <span className="text-purple-400">def</span>{" "}
                    <span className="text-blue-300">greet</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-orange-300">name</span>
                    <span className="text-gray-400">):</span>
                  </div>
                  <div className="pl-6">
                    <span className="text-purple-400">return</span>{" "}
                    <span className="text-green-300">
                      f&quot;Hello, &#123;name&#125;!&quot;
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-blue-300">print</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-blue-300">greet</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-green-300">&quot;World&quot;</span>
                    <span className="text-gray-400">))</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-800 text-green-400">
                    <span className="text-gray-600">&gt;</span> Hello, World!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Start learning today</h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            No sign-up, no credit card, no software to install. Pick a subject
            and go.
          </p>
          <Link
            href="/coding"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
          >
            Start with Coding
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
