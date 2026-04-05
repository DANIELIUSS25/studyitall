"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Zap,
  Brain,
  Timer,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

/* ── Speed Typing Game ── */
function TypingGame() {
  const WORDS = [
    "function", "variable", "array", "object", "string",
    "boolean", "integer", "return", "import", "class",
    "method", "loop", "index", "const", "async",
    "promise", "export", "module", "syntax", "debug",
  ];

  const [gameState, setGameState] = useState<"idle" | "playing" | "done">("idle");
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRef, setTimerRef] = useState<NodeJS.Timeout | null>(null);

  const pickWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setInput("");
    setCurrentWord(pickWord());
    setTimeLeft(30);

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setGameState("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    setTimerRef(interval);
  };

  const handleInput = (value: string) => {
    setInput(value);
    if (value.trim().toLowerCase() === currentWord.toLowerCase()) {
      setScore((s) => s + 1);
      setInput("");
      setCurrentWord(pickWord());
    }
  };

  const reset = () => {
    if (timerRef) clearInterval(timerRef);
    setGameState("idle");
    setScore(0);
    setTimeLeft(30);
    setInput("");
  };

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)]">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-amber-500" />
          <h3 className="font-bold text-sm">Speed Typing</h3>
        </div>
        <span className="text-xs text-[var(--muted-foreground)]">
          Type coding keywords as fast as you can
        </span>
      </div>

      <div className="p-6 text-center">
        {gameState === "idle" && (
          <div>
            <p className="text-[var(--muted-foreground)] text-sm mb-4">
              Type each programming keyword correctly before time runs out. 30 seconds on the clock.
            </p>
            <button
              onClick={startGame}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Start game
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-3xl font-black tabular-nums">{timeLeft}s</p>
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black tabular-nums text-amber-500">{score}</p>
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Score</p>
              </div>
            </div>
            <p className="text-2xl font-mono font-bold mb-4 tracking-wider">
              {currentWord}
            </p>
            <input
              type="text"
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              className="w-full max-w-xs mx-auto block px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--muted)] text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              autoFocus
              placeholder="type here..."
            />
          </div>
        )}

        {gameState === "done" && (
          <div>
            <Trophy size={32} className="text-amber-500 mx-auto mb-3" />
            <p className="text-3xl font-black mb-1">{score}</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              words typed in 30 seconds
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <RotateCcw size={14} />
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Flashcard Game ── */
function FlashcardGame() {
  const CARDS = [
    { term: "Variable", definition: "A named container that stores a value in memory" },
    { term: "Function", definition: "A reusable block of code that performs a specific task" },
    { term: "Array", definition: "An ordered collection of elements accessed by index" },
    { term: "Loop", definition: "A control structure that repeats code until a condition is met" },
    { term: "Boolean", definition: "A data type with only two values: true or false" },
    { term: "API", definition: "Application Programming Interface \u2014 a way for programs to communicate" },
    { term: "Algorithm", definition: "A step-by-step procedure for solving a problem" },
    { term: "Object", definition: "A data structure that groups related properties and methods" },
    { term: "Recursion", definition: "A function that calls itself to break a problem into smaller parts" },
    { term: "String", definition: "A sequence of characters representing text" },
  ];

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const card = CARDS[index];
  const isLast = index >= CARDS.length - 1;

  const handleKnow = () => {
    setKnown((k) => k + 1);
    next();
  };

  const next = () => {
    if (isLast) {
      setIndex(0);
      setFlipped(false);
      return;
    }
    setIndex((i) => i + 1);
    setFlipped(false);
  };

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)]">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain size={18} className="text-violet-500" />
          <h3 className="font-bold text-sm">Flashcards</h3>
        </div>
        <span className="text-xs text-[var(--muted-foreground)]">
          {index + 1} / {CARDS.length} &middot; {known} known
        </span>
      </div>

      <div className="p-6">
        <button
          onClick={() => setFlipped(!flipped)}
          className="w-full min-h-[140px] rounded-xl border border-[var(--border)] bg-[var(--muted)] p-6 text-center cursor-pointer hover:bg-[var(--border)] transition-colors"
        >
          {flipped ? (
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {card.definition}
            </p>
          ) : (
            <p className="text-xl font-bold">{card.term}</p>
          )}
          <p className="text-[10px] text-[var(--muted-foreground)] mt-3 uppercase tracking-wider">
            {flipped ? "Definition" : "Tap to reveal"}
          </p>
        </button>

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--muted)] transition-colors"
          >
            <XCircle size={14} className="text-red-500" />
            Still learning
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--muted)] transition-colors"
          >
            <CheckCircle2 size={14} className="text-emerald-500" />
            Know it
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function GamesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Study Games
        </h1>
        <p className="mt-3 text-lg text-[var(--muted-foreground)]">
          Learn through play. Speed drills, flashcards, and brain teasers that
          make studying addictive.
        </p>
      </div>

      <div className="space-y-8">
        <TypingGame />
        <FlashcardGame />
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/quizzes"
          className="group flex items-center gap-4 p-5 rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] transition-all"
        >
          <Timer size={20} className="text-brand-500 shrink-0" />
          <div>
            <h3 className="font-bold text-sm group-hover:text-brand-500 transition-colors">
              Timed Quizzes
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Test your Python, JavaScript, and AI knowledge
            </p>
          </div>
        </Link>
        <Link
          href="/coding"
          className="group flex items-center gap-4 p-5 rounded-xl border border-[var(--border)] hover:bg-[var(--muted)] transition-all"
        >
          <ArrowRight size={20} className="text-brand-500 shrink-0" />
          <div>
            <h3 className="font-bold text-sm group-hover:text-brand-500 transition-colors">
              Coding Lessons
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Structured path from beginner to advanced
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
