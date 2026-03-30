"use client";

import { Language, LANGUAGE_LABELS } from "@/lib/types";

interface LanguageSelectorProps {
  languages: Language[];
  selected: Language;
  onChange: (lang: Language) => void;
}

export function LanguageSelector({
  languages,
  selected,
  onChange,
}: LanguageSelectorProps) {
  return (
    <div className="flex gap-1 bg-[var(--muted)] p-1 rounded-lg">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            selected === lang
              ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          }`}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
