"use client";

interface LessonContentProps {
  html: string;
}

export function LessonContent({ html }: LessonContentProps) {
  return (
    <div
      className="prose-custom
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3
        [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:mb-4 [&_p]:leading-relaxed
        [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-4 [&_ul]:space-y-1
        [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-4 [&_ol]:space-y-1
        [&_li]:leading-relaxed
        [&_strong]:font-semibold
        [&_code]:bg-[var(--muted)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
        [&_pre]:bg-[var(--muted)] [&_pre]:border [&_pre]:border-[var(--border)] [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:text-sm [&_pre]:font-mono
        [&_pre_code]:bg-transparent [&_pre_code]:p-0
        [&_table]:min-w-full [&_table]:border [&_table]:border-[var(--border)] [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:mb-4
        [&_th]:bg-[var(--muted)] [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:border-b [&_th]:border-[var(--border)]
        [&_td]:px-4 [&_td]:py-2 [&_td]:text-sm [&_td]:border-b [&_td]:border-[var(--border)]
        [&_blockquote]:border-l-4 [&_blockquote]:border-brand-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-[var(--muted-foreground)]
        [&_hr]:my-8 [&_hr]:border-[var(--border)]
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
