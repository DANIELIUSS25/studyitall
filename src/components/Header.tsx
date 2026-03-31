"use client";

import Link from "next/link";
import { BookOpen, Flame, GraduationCap, Newspaper, Crown, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/courses", label: "Courses", icon: <GraduationCap size={16} /> },
  { href: "/quizzes", label: "Quizzes", icon: <Flame size={16} /> },
  { href: "/blog", label: "Blog", icon: <Newspaper size={16} /> },
  { href: "/pricing", label: "Pro", icon: <Crown size={16} /> },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="text-base font-extrabold tracking-tight hidden sm:inline">
              StudyItAll<span className="text-brand-500">.com</span>
            </span>
          </Link>

          {/* Desktop nav — icon + label like Duolingo */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors font-medium"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-lg transition-colors"
            >
              Start free
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--muted)]"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-3 space-y-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                {link.icon}
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            ))}
            <Link
              href="/lesson/module-01-fundamentals/lesson-01-what-is-programming"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 mt-2 bg-brand-500 text-white rounded-lg font-bold text-sm"
            >
              Start free
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
