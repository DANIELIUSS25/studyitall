"use client";

import { useState, useEffect } from "react";
import { Play, Loader2, Trash2 } from "lucide-react";
import { Language } from "@/lib/types";
import { CodeEditor } from "./CodeEditor";
import { LanguageSelector } from "./LanguageSelector";
import { useCodeExecution } from "@/hooks/useCodeExecution";

interface CodePlaygroundProps {
  languages: Language[];
  codeExamples: Partial<Record<Language, string>>;
}

export function CodePlayground({ languages, codeExamples }: CodePlaygroundProps) {
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]);
  const [code, setCode] = useState(codeExamples[languages[0]] || "");
  const { isRunning, output, execute, clear } = useCodeExecution();

  // Update code when language changes
  useEffect(() => {
    setCode(codeExamples[selectedLang] || `// No ${selectedLang} example available`);
    clear();
  }, [selectedLang, codeExamples, clear]);

  const handleRun = () => {
    execute(selectedLang, code);
  };

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 p-3 border-b border-[var(--border)]">
        <LanguageSelector
          languages={languages}
          selected={selectedLang}
          onChange={setSelectedLang}
        />
        <div className="flex items-center gap-2">
          {output && (
            <button
              onClick={clear}
              className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              title="Clear output"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
          >
            {isRunning ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play size={16} />
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <CodeEditor language={selectedLang} value={code} onChange={setCode} />

      {/* Output */}
      {output && (
        <div className="border-t border-[var(--border)]">
          <div className="px-3 py-2 bg-[var(--muted)] text-xs font-medium text-[var(--muted-foreground)] flex items-center justify-between">
            <span>Output</span>
            <span
              className={
                output.exitCode === 0 ? "text-green-500" : "text-red-500"
              }
            >
              {output.exitCode === 0 ? "Success" : `Exit code: ${output.exitCode}`}
            </span>
          </div>
          <pre className="code-output p-4 text-sm font-mono max-h-[200px] overflow-auto bg-gray-950 text-gray-100">
            {output.stdout && (
              <span>{output.stdout}</span>
            )}
            {output.stderr && (
              <span className="text-red-400">{output.stderr}</span>
            )}
            {!output.stdout && !output.stderr && (
              <span className="text-gray-500">(No output)</span>
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
