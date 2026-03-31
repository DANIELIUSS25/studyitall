import Link from "next/link";
import {
  Code2,
  Calculator,
  FlaskConical,
  Landmark,
  BookText,
  Languages,
  Brain,
  ArrowRight,
  Play,
  BookOpen,
  Trophy,
  Flame,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { SUBJECTS } from "@/lib/subjects";
import { getAllPosts } from "@/lib/blog";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={22} />,
  Brain: <Brain size={22} />,
  Calculator: <Calculator size={22} />,
  FlaskConical: <FlaskConical size={22} />,
  Landmark: <Landmark size={22} />,
  BookText: <BookText size={22} />,
  Languages: <Languages size={22} />,
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="bg-[var(--surface)] dark:bg-[var(--background)] min-h-screen">
      {/* ═══ Welcome banner ═══ */}
      <section className="bg-brand-500 dark:bg-brand-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">
                StudyItAll.com
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                What do you want to learn today?
              </h1>
              <p className="text-blue-100 mt-1">
                Free lessons. No sign-up. Jump right in.
              </p>
            </div>
            <Link
              href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-brand-700 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm"
            >
              <Play size={16} className="fill-brand-700" />
              Start first lesson
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Subject cards ═══ */}
      <section className="py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold mb-4">Subjects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  className="group flex items-stretch bg-[var(--card)] dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {/* Color stripe */}
                  <div className={`w-1.5 ${subject.stripe} shrink-0`} />

                  <div className="flex-1 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-9 h-9 rounded-lg ${subject.iconBg} ${subject.iconColor} flex items-center justify-center shrink-0`}
                      >
                        {ICON_MAP[subject.icon]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm leading-tight">
                          {subject.name}
                        </h3>
                        <p className="text-xs text-[var(--muted-foreground)] truncate">
                          {subject.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[var(--muted-foreground)]">
                          {subject.topicCount} topics
                          {subject.lessonCount > 0 &&
                            ` \u00b7 ${subject.lessonCount} lessons`}
                        </span>
                      </div>
                      {isLive ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                          START
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                          SOON
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Featured: Coding path ═══ */}
      <section className="pb-8 sm:pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--card)] dark:bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
            {/* header bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Code2 size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-sm">Coding Path</h2>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    12 modules &middot; 4 languages &middot; 240+ hours
                  </p>
                </div>
              </div>
              <Link
                href="/coding"
                className="text-xs font-semibold text-brand-500 hover:text-brand-600"
              >
                View all &rarr;
              </Link>
            </div>

            {/* Language pills */}
            <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-2 overflow-x-auto">
              {[
                { name: "Python", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300" },
                { name: "JavaScript", color: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300" },
                { name: "C++", color: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300" },
                { name: "Java", color: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300" },
              ].map((lang) => (
                <span
                  key={lang.name}
                  className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${lang.color}`}
                >
                  {lang.name}
                </span>
              ))}
            </div>

            {/* Module list — first 5 */}
            <div className="divide-y divide-[var(--border)]">
              {[
                { n: 1, name: "Programming Fundamentals", lessons: 4, desc: "Variables, loops, functions", available: true },
                { n: 2, name: "Data Structures", lessons: 2, desc: "Arrays, linked lists, stacks", available: true },
                { n: 3, name: "Object-Oriented Design", lessons: 1, desc: "Classes, inheritance, SOLID", available: true },
                { n: 4, name: "Trees, Graphs & Hashing", lessons: 0, desc: "BSTs, heaps, hash tables", available: false },
                { n: 5, name: "Algorithms", lessons: 1, desc: "Sorting, searching, recursion", available: true },
              ].map((m) => (
                <Link
                  key={m.n}
                  href={
                    m.available
                      ? `/lesson/module-0${m.n}-${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}/lesson-01-${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`
                      : "/curriculum"
                  }
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--muted)] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center text-xs font-bold text-[var(--muted-foreground)] group-hover:bg-brand-100 group-hover:text-brand-600 dark:group-hover:bg-brand-500/20 dark:group-hover:text-brand-400 transition-colors shrink-0">
                    {m.n}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold group-hover:text-brand-500 transition-colors">
                      {m.name}
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      {m.desc}
                    </p>
                  </div>
                  <span className="text-[11px] text-[var(--muted-foreground)] shrink-0">
                    {m.lessons} {m.lessons === 1 ? "lesson" : "lessons"}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-[var(--border)] group-hover:text-brand-500 shrink-0 transition-colors"
                  />
                </Link>
              ))}
            </div>

            {/* View full curriculum button */}
            <div className="px-5 py-4 border-t border-[var(--border)]">
              <Link
                href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
                className="flex items-center justify-center gap-2 w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-bold transition-colors"
              >
                <Play size={16} className="fill-white" />
                Start learning to code
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ How it works — horizontal cards ═══ */}
      <section className="py-8 sm:py-10 bg-[var(--background)] dark:bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold mb-4">How it works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: <BookOpen size={20} />,
                color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
                title: "Read & listen",
                desc: "Short lessons with audio narration. Learn a concept in 5\u201310 minutes.",
              },
              {
                icon: <Play size={20} />,
                color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
                title: "Practice live",
                desc: "Write code in your browser and run it instantly. No downloads needed.",
              },
              {
                icon: <Trophy size={20} />,
                color: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
                title: "Test yourself",
                desc: "Take quizzes with instant feedback and explanations for every answer.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-[var(--card)] dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-3`}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Quick actions row ═══ */}
      <section className="py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold mb-4">Explore</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: "/quizzes", icon: <Flame size={20} />, label: "Quizzes", color: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400" },
              { href: "/courses", icon: <BookOpen size={20} />, label: "All courses", color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
              { href: "/blog", icon: <Sparkles size={20} />, label: "Blog", color: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400" },
              { href: "/pricing", icon: <Trophy size={20} />, label: "Go Pro", color: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 py-5 bg-[var(--card)] dark:bg-[var(--card)] rounded-xl border border-[var(--border)] hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Blog — compact cards ═══ */}
      {posts.length > 0 && (
        <section className="pb-8 sm:pb-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Latest articles</h2>
              <Link
                href="/blog"
                className="text-xs font-semibold text-brand-500 hover:text-brand-600"
              >
                All posts &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[var(--card)] dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:shadow-md transition-all"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-sm mt-1 mb-2 group-hover:text-brand-500 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-[var(--muted-foreground)]">
                    <span>{post.readTime}</span>
                    <span>&middot;</span>
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Bottom CTA ═══ */}
      <section className="bg-brand-500 dark:bg-brand-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            Ready to start?
          </h2>
          <p className="text-blue-100 mb-6">
            No sign-up, no credit card. Just pick a lesson and go.
          </p>
          <Link
            href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm"
          >
            Open your first lesson
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
