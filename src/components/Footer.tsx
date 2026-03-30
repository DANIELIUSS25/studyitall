import { BookOpen } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="text-white" size={14} />
              </div>
              <span>StudyItAll</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              One platform, every subject. Master coding, math, science, and more
              with interactive lessons and audio narration.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Subjects</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>
                <Link
                  href="/coding"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Coding
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects/mathematics"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Mathematics
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects/science"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects/history"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects/english"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  English
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects/spanish"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Spanish
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Coding</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>
                <Link
                  href="/curriculum"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Full Curriculum
                </Link>
              </li>
              <li>
                <Link
                  href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <span>Python &middot; JavaScript &middot; C++ &middot; Java</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>
                <a
                  href="https://newra.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Newra.io
                </a>
              </li>
              <li>
                <a
                  href="https://vantlir.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Vantlir.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--muted-foreground)]">
          <p>&copy; {new Date().getFullYear()} StudyItAll. Learn everything, one lesson at a time.</p>
          <p>
            A product of{" "}
            <a
              href="https://newra.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] hover:text-brand-500 transition-colors"
            >
              Newra.io
            </a>{" "}
            &middot; Powered by{" "}
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
