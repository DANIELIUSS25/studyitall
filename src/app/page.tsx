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
  Terminal,
  GraduationCap,
  Zap,
  ChevronRight,
} from "lucide-react";
import { SUBJECTS } from "@/lib/subjects";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />,
  Calculator: <Calculator size={24} />,
  FlaskConical: <FlaskConical size={24} />,
  Landmark: <Landmark size={24} />,
  BookText: <BookText size={24} />,
  Languages: <Languages size={24} />,
};

export default function Home() {
  return (
    <div>
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        {/* subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* radial fade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(51,102,255,0.08),transparent)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-20 sm:pb-28">
          <div className="max-w-3xl">
            <p className="text-brand-500 font-semibold tracking-wide text-sm mb-4">
              Free. No sign-up required.
            </p>

            <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-violet-500">
                smartest
              </span>{" "}
              way to study anything
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl">
              Interactive lessons with code you can run, audio you can take
              anywhere, and a curriculum that actually makes sense. Start in
              seconds.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-brand-500/25"
              >
                Start learning now
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
              >
                Browse curriculum
              </Link>
            </div>
          </div>

          {/* floating code card — positioned right, gives depth */}
          <div className="hidden lg:block absolute right-8 xl:right-16 top-24 w-[340px]">
            <div className="bg-[#0c0c0f] rounded-2xl shadow-2xl shadow-black/20 border border-white/[0.06] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[11px] text-zinc-500 font-mono">
                  lesson_01.py
                </span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                <div className="text-zinc-500"># Your first program</div>
                <div className="mt-1">
                  <span className="text-violet-400">def</span>{" "}
                  <span className="text-blue-300">greet</span>
                  <span className="text-zinc-400">(</span>
                  <span className="text-orange-300">name</span>
                  <span className="text-zinc-400">):</span>
                </div>
                <div className="pl-6">
                  <span className="text-violet-400">return</span>{" "}
                  <span className="text-emerald-300">
                    f&quot;Hello, &#123;name&#125;!&quot;
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-blue-300">print</span>
                  <span className="text-zinc-400">(</span>
                  <span className="text-blue-300">greet</span>
                  <span className="text-zinc-400">(</span>
                  <span className="text-emerald-300">&quot;World&quot;</span>
                  <span className="text-zinc-400">))</span>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <span className="text-zinc-600">$</span>{" "}
                  <span className="text-emerald-400">Hello, World!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SOCIAL PROOF BAR ═══════ */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-[var(--muted-foreground)]">
            <span className="flex items-center gap-2">
              <Terminal size={16} className="text-brand-500" />
              <strong className="text-[var(--foreground)]">4</strong> programming
              languages
            </span>
            <span className="hidden sm:inline text-[var(--border)]">|</span>
            <span className="flex items-center gap-2">
              <GraduationCap size={16} className="text-brand-500" />
              <strong className="text-[var(--foreground)]">12</strong> structured
              modules
            </span>
            <span className="hidden sm:inline text-[var(--border)]">|</span>
            <span className="flex items-center gap-2">
              <Headphones size={16} className="text-brand-500" />
              Audio on every lesson
            </span>
            <span className="hidden sm:inline text-[var(--border)]">|</span>
            <span className="flex items-center gap-2">
              <Zap size={16} className="text-brand-500" />
              100% free
            </span>
          </div>
        </div>
      </section>

      {/* ═══════ SUBJECTS ═══════ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Pick a subject
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">
              Coding is ready now. We&apos;re adding math, science, history,
              English, and Spanish throughout 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className={`group relative rounded-2xl p-6 transition-all ${
                    isLive
                      ? "glow-border bg-[var(--card)] hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-0.5"
                      : "bg-[var(--muted)] hover:bg-[var(--card)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isLive
                          ? "bg-brand-500 text-white"
                          : "bg-[var(--border)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      {ICON_MAP[subject.icon]}
                    </div>
                    {isLive ? (
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        Live
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
                        2026
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold mb-1 group-hover:text-brand-500 transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {subject.tagline}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs font-medium text-[var(--muted-foreground)] group-hover:text-brand-500 transition-colors">
                    {isLive ? "Start learning" : "View topics"}
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-20 sm:py-24 border-y border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-lg mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How it works
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)]">
              Every subject follows the same format. No surprises, just
              consistent progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] rounded-2xl overflow-hidden">
            {[
              {
                step: "01",
                title: "Read the lesson",
                body: "Short, focused explanations with real examples. No filler, no fluff. Each lesson targets one concept and makes it stick.",
              },
              {
                step: "02",
                title: "Practice in your browser",
                body: "Type code, run it, and see output instantly. Make mistakes, fix them, and build intuition through hands-on repetition.",
              },
              {
                step: "03",
                title: "Listen and review",
                body: "Every lesson has audio narration. Replay while commuting, doing chores, or reviewing before an exam.",
              },
            ].map((f) => (
              <div
                key={f.step}
                className="bg-[var(--card)] p-8 sm:p-10"
              >
                <span className="text-5xl font-black text-[var(--border)] dark:text-[var(--border)]">
                  {f.step}
                </span>
                <h3 className="text-lg font-bold mt-4 mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CODING SPOTLIGHT ═══════ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-[var(--border)] bg-gradient-to-br from-brand-950 to-zinc-950 dark:from-brand-950 dark:to-black">
            <div className="grid lg:grid-cols-2">
              {/* left: content */}
              <div className="p-8 sm:p-12 lg:p-14">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-4">
                  Available now
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Coding
                </h2>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  Our flagship subject. 12 modules across four languages, from
                  printing &ldquo;Hello World&rdquo; to designing scalable systems.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {["Python", "JavaScript", "C++", "Java"].map((l) => (
                    <div
                      key={l}
                      className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-medium text-white"
                    >
                      {l}
                    </div>
                  ))}
                </div>

                <ul className="mt-8 space-y-3">
                  {[
                    "Write and execute code in your browser",
                    "Data structures, algorithms, OOP, system design",
                    "Real projects, not toy exercises",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
                  className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 bg-white text-brand-950 rounded-full text-sm font-bold tracking-wide hover:bg-zinc-100 transition-colors"
                >
                  Begin Lesson 1
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* right: module preview */}
              <div className="hidden lg:flex items-center justify-center p-10 border-l border-white/[0.06]">
                <div className="w-full max-w-xs space-y-2">
                  {[
                    { n: 1, name: "Programming Fundamentals", lessons: 4, done: true },
                    { n: 2, name: "Data Structures", lessons: 2, done: false, active: true },
                    { n: 3, name: "Object-Oriented Design", lessons: 1 },
                    { n: 4, name: "Trees, Graphs & Hashing", lessons: 0 },
                    { n: 5, name: "Algorithms", lessons: 1 },
                  ].map((m) => (
                    <div
                      key={m.n}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                        m.active
                          ? "bg-white/[0.08] border border-white/[0.1]"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          m.done
                            ? "bg-emerald-500/20 text-emerald-400"
                            : m.active
                            ? "bg-brand-500/20 text-brand-400"
                            : "bg-white/[0.05] text-zinc-500"
                        }`}
                      >
                        {m.n}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            m.done
                              ? "text-zinc-500"
                              : m.active
                              ? "text-white"
                              : "text-zinc-400"
                          }`}
                        >
                          {m.name}
                        </p>
                        <p className="text-[11px] text-zinc-600">
                          {m.lessons} {m.lessons === 1 ? "lesson" : "lessons"}
                        </p>
                      </div>
                      {m.done && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                          Done
                        </span>
                      )}
                      {m.active && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                          Current
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] dark:bg-[var(--muted)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Start right now
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)] text-lg">
            No sign-up. No credit card. No installs.
            <br />
            Just pick a lesson and go.
          </p>
          <Link
            href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
            className="inline-flex items-center gap-2.5 mt-8 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-brand-500/25"
          >
            Open your first lesson
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
