import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getLesson, getAllLessonParams, getAdjacentLessons, getModule } from "@/lib/content";
import { LessonContent } from "@/components/lesson/LessonContent";
import { CodePlayground } from "@/components/lesson/CodePlayground";
import { AudioPlayer } from "@/components/lesson/AudioPlayer";
import { Metadata } from "next";
import { UpgradePrompt } from "@/components/upgrade/UpgradePrompt";
import { MarkCompleteButton } from "@/components/lesson/MarkCompleteButton";

interface PageParams {
  moduleSlug: string;
  lessonSlug: string;
}

export async function generateStaticParams() {
  return getAllLessonParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = getLesson(moduleSlug, lessonSlug);
  if (!lesson) return { title: "Lesson Not Found" };

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = getLesson(moduleSlug, lessonSlug);
  if (!lesson) notFound();

  const mod = getModule(moduleSlug);
  const { prev, next } = getAdjacentLessons(moduleSlug, lessonSlug);

  const processed = await remark().use(remarkHtml).process(lesson.content);
  const contentHtml = processed.toString();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/curriculum" className="hover:text-[var(--foreground)] transition-colors">
          Curriculum
        </Link>
        <ChevronRight size={14} />
        <span className="truncate">{mod?.title || moduleSlug}</span>
        <ChevronRight size={14} />
        <span className="text-[var(--foreground)] font-medium truncate">
          {lesson.title}
        </span>
      </nav>

      {/* Lesson header */}
      <header className="mb-8">
        <div className="text-sm text-brand-500 font-medium mb-2">
          Module {mod?.order} &middot; Lesson {lesson.order}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          {lesson.description}
        </p>
      </header>

      {/* Audio player */}
      <div className="mb-8">
        <AudioPlayer src={lesson.audioUrl} title={lesson.title} />
      </div>

      {/* Lesson content */}
      <article className="mb-10">
        <LessonContent html={contentHtml} />
      </article>

      {/* Code playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Code Playground</h2>
        <p className="text-[var(--muted-foreground)] mb-4">
          Edit the code below and click <strong>Run</strong> to see the output.
          Switch between languages using the tabs.
        </p>
        <CodePlayground
          languages={lesson.languages}
          codeExamples={lesson.codeExamples}
        />
      </section>

      {/* Mark complete */}
      <div className="mb-6">
        <MarkCompleteButton moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
      </div>

      {/* Upgrade nudge */}
      <div className="mb-10">
        <UpgradePrompt
          variant="inline-nudge"
          subjectName={mod?.title || "coding"}
        />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between gap-4 pt-8 border-t border-[var(--border)]">
        {prev ? (
          <Link
            href={`/lesson/${prev.moduleSlug}/${prev.lessonSlug}`}
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <div className="text-right">
              <div className="text-xs">Previous</div>
              <div className="font-medium text-sm">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/lesson/${next.moduleSlug}/${next.lessonSlug}`}
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
          >
            <div>
              <div className="text-xs">Next</div>
              <div className="font-medium text-sm">{next.title}</div>
            </div>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
