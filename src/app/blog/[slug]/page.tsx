import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getPost, getAllPostSlugs } from "@/lib/blog";
import { LessonContent } from "@/components/lesson/LessonContent";
import { Metadata } from "next";

interface PageParams {
  slug: string;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: "StudyItAll.com",
    },
    alternates: {
      canonical: `https://studyitall.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const processed = await remark().use(remarkHtml).process(post.content);
  const contentHtml = processed.toString();

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://studyitall.com",
    },
    publisher: {
      "@type": "Organization",
      name: "StudyItAll.com",
      url: "https://studyitall.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://studyitall.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
              {post.category}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              &middot; {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--muted-foreground)] leading-relaxed">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <LessonContent html={contentHtml} />

        {/* Internal backlinks */}
        <footer className="mt-16 pt-8 border-t border-[var(--border)]">
          <h3 className="font-bold mb-4">Keep learning on StudyItAll.com</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/coding"
              className="p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
            >
              <p className="font-semibold text-sm">Learn Coding</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Python, JavaScript, C++, and Java
              </p>
            </Link>
            <Link
              href="/curriculum"
              className="p-4 rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
            >
              <p className="font-semibold text-sm">Full Curriculum</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                12 modules, beginner to advanced
              </p>
            </Link>
          </div>
        </footer>
      </article>
    </>
  );
}
