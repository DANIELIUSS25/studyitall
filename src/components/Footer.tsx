import { BookOpen } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <div className="w-6 h-6 rounded-md bg-brand-600 flex items-center justify-center">
                <BookOpen className="text-white" size={12} />
              </div>
              <span>StudyItAll</span>
            </Link>
            <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
              Free interactive lessons from beginner to advanced. No account
              needed.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] mb-3">
              Subjects
            </h3>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li><Link href="/coding" className="hover:text-[var(--foreground)] transition-colors">Coding</Link></li>
              <li><Link href="/subjects/mathematics" className="hover:text-[var(--foreground)] transition-colors">Mathematics</Link></li>
              <li><Link href="/subjects/science" className="hover:text-[var(--foreground)] transition-colors">Science</Link></li>
              <li><Link href="/subjects/history" className="hover:text-[var(--foreground)] transition-colors">History</Link></li>
              <li><Link href="/subjects/english" className="hover:text-[var(--foreground)] transition-colors">English</Link></li>
              <li><Link href="/subjects/spanish" className="hover:text-[var(--foreground)] transition-colors">Spanish</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] mb-3">
              Coding
            </h3>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li><Link href="/curriculum" className="hover:text-[var(--foreground)] transition-colors">Full Curriculum</Link></li>
              <li><Link href="/lesson/module-01-fundamentals/lesson-01-what-is-programming" className="hover:text-[var(--foreground)] transition-colors">Start Lesson 1</Link></li>
              <li><span>Python &middot; JS &middot; C++ &middot; Java</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
          <p>&copy; {new Date().getFullYear()} StudyItAll</p>
          <p>
            A product of{" "}
            <a
              href="https://newra.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] hover:text-brand-500 transition-colors"
            >
              Newra.io
            </a>
            {" "}&middot;{" "}
            Powered by{" "}
            <a
              href="https://vantlir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] hover:text-brand-500 transition-colors"
            >
              Vantlir.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
