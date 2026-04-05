"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { useSession } from "next-auth/react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizCardProps {
  title: string;
  questions: QuizQuestion[];
  quizId?: string;
}

export function QuizCard({ title, questions, quizId }: QuizCardProps) {
  const { data: session } = useSession();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  // Load previous best score
  useEffect(() => {
    if (!session?.user || !quizId) return;
    fetch(`/api/progress/quiz-score?quizId=${quizId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.bestScore > 0) setBestScore(d.bestScore);
      })
      .catch(() => {});
  }, [session, quizId]);

  // Save score when quiz completes
  useEffect(() => {
    if (!showResult || !session?.user || !quizId || saved) return;
    setSaved(true);
    fetch("/api/progress/quiz-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizId, score, total: questions.length }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.bestScore !== undefined) setBestScore(d.bestScore);
      })
      .catch(() => {});
  }, [showResult, session, quizId, score, questions.length, saved]);

  const q = questions[current];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSaved(false);
  };

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    const bestPct = bestScore !== null ? Math.round((bestScore / questions.length) * 100) : null;
    return (
      <div className="border border-[var(--border)] rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-extrabold mb-2">{title}</h3>
        <div className="text-5xl font-black text-brand-500 my-4">{pct}%</div>
        <p className="text-[var(--muted-foreground)] mb-2">
          You got {score} out of {questions.length} correct
        </p>
        {bestPct !== null && bestPct !== pct && (
          <p className="text-xs text-[var(--muted-foreground)] mb-4 flex items-center justify-center gap-1">
            <Trophy size={12} className="text-amber-500" />
            Personal best: {bestPct}%
          </p>
        )}
        {saved && (
          <p className="text-xs text-emerald-500 mb-4">Score saved</p>
        )}
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-semibold transition-colors"
        >
          <RotateCcw size={14} />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm">{title}</h3>
          {bestScore !== null && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
              <Trophy size={10} />
              Best: {Math.round((bestScore / questions.length) * 100)}%
            </span>
          )}
        </div>
        <span className="text-xs text-[var(--muted-foreground)]">
          {current + 1} / {questions.length}
        </span>
      </div>

      <div className="h-1 bg-[var(--muted)]">
        <div
          className="h-full bg-brand-500 transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-6">
        <p className="font-semibold mb-4">{q.question}</p>

        <div className="space-y-2">
          {q.options.map((option, i) => {
            let style = "border-[var(--border)] hover:bg-[var(--muted)]";
            if (answered) {
              if (i === q.correctIndex) {
                style = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
              } else if (i === selected && i !== q.correctIndex) {
                style = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
              } else {
                style = "border-[var(--border)] opacity-50";
              }
            } else if (i === selected) {
              style = "border-brand-500 bg-brand-500/10";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${style}`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs shrink-0">
                    {answered && i === q.correctIndex ? (
                      <CheckCircle2 size={14} />
                    ) : answered && i === selected ? (
                      <XCircle size={14} />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-4 p-4 rounded-xl bg-[var(--muted)] text-sm text-[var(--muted-foreground)]">
            {q.explanation}
          </div>
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="mt-4 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-semibold transition-colors"
          >
            {current + 1 >= questions.length ? "See Results" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}
