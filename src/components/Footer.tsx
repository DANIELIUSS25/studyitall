import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-lg font-extrabold tracking-tight">
              Study<span className="text-brand-500">It</span>All
            </Link>
            <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">
              Free interactive education.
              <br />
              No account needed.
            </p>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Subjects
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/coding" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Coding</Link></li>
              <li><Link href="/subjects/mathematics" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Mathematics</Link></li>
              <li><Link href="/subjects/science" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Science</Link></li>
              <li><Link href="/subjects/history" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">History</Link></li>
              <li><Link href="/subjects/english" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">English</Link></li>
              <li><Link href="/subjects/spanish" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Spanish</Link></li>
            </ul>
          </div>

          {/* Coding */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Coding
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/curriculum" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Curriculum</Link></li>
              <li><Link href="/lesson/module-01-fundamentals/lesson-01-what-is-programming" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Start Lesson 1</Link></li>
              <li><span className="text-[var(--muted-foreground)]">Python &middot; JS &middot; C++ &middot; Java</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://newra.io" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                  Newra.io
                </a>
              </li>
              <li>
                <a href="https://vantlir.com" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                  Vantlir.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
          <p>&copy; {new Date().getFullYear()} StudyItAll</p>
          <p>
            Built by{" "}
            <a href="https://newra.io" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--foreground)] hover:text-brand-500 transition-colors">Newra</a>
            {" "}&middot;{" "}
            Powered by{" "}
            <a href="https://vantlir.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--foreground)] hover:text-brand-500 transition-colors">Vantlir</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
