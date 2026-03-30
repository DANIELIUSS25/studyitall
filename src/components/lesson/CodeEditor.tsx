"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { LANGUAGE_MONACO_MAP, Language } from "@/lib/types";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-[var(--muted)] rounded-lg flex items-center justify-center text-[var(--muted-foreground)]">
      Loading editor...
    </div>
  ),
});

interface CodeEditorProps {
  language: Language;
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border)]">
      <MonacoEditor
        height="300px"
        language={LANGUAGE_MONACO_MAP[language]}
        value={value}
        onChange={(val) => onChange(val || "")}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          tabSize: 4,
          renderLineHighlight: "line",
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  );
}
