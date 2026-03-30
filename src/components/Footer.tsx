import { Code2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Code2 className="text-brand-500" size={24} />
              <span>StudyItAll</span>
            </Link>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Master programming from beginner to advanced with interactive
              lessons, live code execution, and audio narration.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Learn</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li><Link href="/curriculum" className="hover:text-[var(--foreground)] transition-colors">Full Curriculum</Link></li>
              <li><Link href="/lesson/module-01-fundamentals/lesson-01-what-is-programming" className="hover:text-[var(--foreground)] transition-colors">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Languages</h3>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>Python</li>
              <li>JavaScript</li>
              <li>C++</li>
              <li>Java</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted-foreground)]">
          &copy; {new Date().getFullYear()} StudyItAll. Learn to code, one lesson at a time.
        </div>
      </div>
    </footer>
  );
}
