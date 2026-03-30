import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — StudyItAll.com",
  description:
    "Articles on learning to code, AI, programming languages, study tips, and more. Free guides and tutorials from StudyItAll.com.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Blog
        </h1>
        <p className="mt-3 text-lg text-[var(--muted-foreground)]">
          Guides, tutorials, and insights on coding, AI, languages, and
          learning effectively. New articles weekly.
        </p>
      </div>

      <div className="space-y-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-6 border-b border-[var(--border)] hover:bg-[var(--muted)] -mx-4 px-4 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
                {post.category}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold group-hover:text-brand-500 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-1">
                {post.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] shrink-0">
              <span>{post.readTime}</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-[var(--muted-foreground)] text-center py-12">
          Blog posts coming soon.
        </p>
      )}
    </div>
  );
}
