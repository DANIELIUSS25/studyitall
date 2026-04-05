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

/* ── Memory Match Game ── */
function MemoryMatchGame() {
  const PAIRS = [
    { term: "let", match: "Variable" },
    { term: "if", match: "Conditional" },
    { term: "for", match: "Loop" },
    { term: "def", match: "Function" },
    { term: "[]", match: "Array" },
    { term: "{}", match: "Object" },
  ];

  const [cards, setCards] = useState<{ id: number; text: string; pairId: number; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);

  const startGame = () => {
    const deck = PAIRS.flatMap((p, i) => [
      { id: i * 2, text: p.term, pairId: i, flipped: false, matched: false },
      { id: i * 2 + 1, text: p.match, pairId: i, flipped: false, matched: false },
    ]).sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedIds([]);
    setMoves(0);
    setStarted(true);
  };

  const handleFlip = (id: number) => {
    if (flippedIds.length >= 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped.map((fid) => cards.find((c) => c.id === fid)!);
      const aCard = a.id === id ? { ...a, flipped: true } : a;
      const bCard = b.id === id ? { ...b, flipped: true } : b;

      if (aCard.pairId === bCard.pairId) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.pairId === aCard.pairId ? { ...c, matched: true, flipped: true } : c)));
          setFlippedIds([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.matched ? c : { ...c, flipped: false })));
          setFlippedIds([]);
        }, 800);
      }
    }
  };

  const allMatched = started && cards.length > 0 && cards.every((c) => c.matched);

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)]">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain size={18} className="text-emerald-500" />
          <h3 className="font-bold text-sm">Memory Match</h3>
        </div>
        {started && (
          <span className="text-xs text-[var(--muted-foreground)]">
            {moves} moves
          </span>
        )}
      </div>
      <div className="p-6">
        {!started ? (
          <div className="text-center">
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Match programming keywords with their meanings. Flip two cards at a time.
            </p>
            <button onClick={startGame} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors">
              Start game
            </button>
          </div>
        ) : allMatched ? (
          <div className="text-center">
            <Trophy size={32} className="text-emerald-500 mx-auto mb-3" />
            <p className="text-2xl font-black mb-1">All matched!</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">Completed in {moves} moves</p>
            <button onClick={startGame} className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors">
              <RotateCcw size={14} /> Play again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleFlip(card.id)}
                className={`h-20 rounded-xl text-sm font-bold transition-all ${
                  card.matched
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : card.flipped
                    ? "bg-brand-500/10 border border-brand-500/30 text-brand-600 dark:text-brand-400"
                    : "bg-[var(--muted)] border border-[var(--border)] text-transparent hover:bg-[var(--border)] cursor-pointer"
                }`}
              >
                {card.flipped || card.matched ? card.text : "?"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Code Puzzle Game ── */
function CodePuzzleGame() {
  const PUZZLES = [
    {
      title: "Print numbers 1-5",
      lines: ["for i in range(1, 6):", "    print(i)"],
      language: "Python",
    },
    {
      title: "Define and call a function",
      lines: ["def greet(name):", '    return f"Hello, {name}!"', 'print(greet("World"))'],
      language: "Python",
    },
    {
      title: "Check if even or odd",
      lines: ["number = 7", "if number % 2 == 0:", '    print("Even")', "else:", '    print("Odd")'],
      language: "Python",
    },
  ];

  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const puzzle = PUZZLES[puzzleIdx];

  const initPuzzle = (idx: number) => {
    const p = PUZZLES[idx];
    setShuffled([...p.lines].sort(() => Math.random() - 0.5));
    setAnswer([]);
    setChecked(false);
    setCorrect(false);
  };

  useState(() => { initPuzzle(0); });

  const addLine = (line: string) => {
    if (checked) return;
    setShuffled((prev) => prev.filter((l) => l !== line));
    setAnswer((prev) => [...prev, line]);
  };

  const removeLine = (line: string) => {
    if (checked) return;
    setAnswer((prev) => prev.filter((l) => l !== line));
    setShuffled((prev) => [...prev, line]);
  };

  const checkAnswer = () => {
    setChecked(true);
    setCorrect(JSON.stringify(answer) === JSON.stringify(puzzle.lines));
  };

  const nextPuzzle = () => {
    const next = (puzzleIdx + 1) % PUZZLES.length;
    setPuzzleIdx(next);
    initPuzzle(next);
  };

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)]">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-blue-500" />
          <h3 className="font-bold text-sm">Code Puzzle</h3>
        </div>
        <span className="text-xs text-[var(--muted-foreground)]">
          {puzzle.language} &middot; {puzzleIdx + 1}/{PUZZLES.length}
        </span>
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold mb-4">
          Arrange the lines to: <span className="text-brand-500">{puzzle.title}</span>
        </p>

        {/* Answer area */}
        <div className="min-h-[80px] rounded-xl border-2 border-dashed border-[var(--border)] p-3 mb-4 space-y-1.5">
          {answer.length === 0 && (
            <p className="text-xs text-[var(--muted-foreground)] text-center py-4">
              Tap lines below to build your code
            </p>
          )}
          {answer.map((line, i) => (
            <button
              key={i}
              onClick={() => removeLine(line)}
              className={`block w-full text-left px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                checked
                  ? line === puzzle.lines[i]
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400"
                  : "bg-[var(--muted)] hover:bg-[var(--border)] cursor-pointer"
              }`}
            >
              {line}
            </button>
          ))}
        </div>

        {/* Available lines */}
        {shuffled.length > 0 && (
          <div className="space-y-1.5 mb-4">
            {shuffled.map((line, i) => (
              <button
                key={i}
                onClick={() => addLine(line)}
                className="block w-full text-left px-3 py-2 rounded-lg font-mono text-xs bg-[var(--muted)] hover:bg-[var(--border)] cursor-pointer transition-colors"
              >
                {line}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {!checked && answer.length === puzzle.lines.length && (
            <button onClick={checkAnswer} className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-semibold transition-colors">
              Check
            </button>
          )}
          {checked && (
            <>
              <p className={`flex items-center gap-1 text-sm font-semibold ${correct ? "text-emerald-500" : "text-red-500"}`}>
                {correct ? <><CheckCircle2 size={16} /> Correct!</> : <><XCircle size={16} /> Not quite</>}
              </p>
              <button onClick={nextPuzzle} className="ml-auto px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-xs font-semibold transition-colors">
                Next puzzle
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Math Speed Drill ── */
function MathDrillGame() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "done">("idle");
  const [question, setQuestion] = useState({ a: 0, b: 0, op: "+", answer: 0 });
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRef, setTimerRef] = useState<NodeJS.Timeout | null>(null);

  const generateQuestion = () => {
    const ops = ["+", "-", "*"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a: number, b: number, answer: number;
    if (op === "*") {
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      answer = a * b;
    } else if (op === "-") {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * a);
      answer = a - b;
    } else {
      a = Math.floor(Math.random() * 50) + 1;
      b = Math.floor(Math.random() * 50) + 1;
      answer = a + b;
    }
    return { a, b, op, answer };
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setInput("");
    setQuestion(generateQuestion());
    setTimeLeft(30);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(interval); setGameState("done"); return 0; }
        return t - 1;
      });
    }, 1000);
    setTimerRef(interval);
  };

  const handleInput = (value: string) => {
    setInput(value);
    if (value === String(question.answer)) {
      setScore((s) => s + 1);
      setInput("");
      setQuestion(generateQuestion());
    }
  };

  const reset = () => {
    if (timerRef) clearInterval(timerRef);
    setGameState("idle");
  };

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)]">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer size={18} className="text-cyan-500" />
          <h3 className="font-bold text-sm">Math Speed Drill</h3>
        </div>
        <span className="text-xs text-[var(--muted-foreground)]">30 seconds</span>
      </div>
      <div className="p-6 text-center">
        {gameState === "idle" && (
          <div>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Solve as many arithmetic problems as you can in 30 seconds.
            </p>
            <button onClick={startGame} className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold transition-colors">
              Start drill
            </button>
          </div>
        )}
        {gameState === "playing" && (
          <div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <div><p className="text-3xl font-black tabular-nums">{timeLeft}s</p><p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Time</p></div>
              <div><p className="text-3xl font-black tabular-nums text-cyan-500">{score}</p><p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Score</p></div>
            </div>
            <p className="text-3xl font-mono font-bold mb-4">{question.a} {question.op} {question.b} = ?</p>
            <input
              type="number"
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              className="w-32 mx-auto block px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--muted)] text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              autoFocus
            />
          </div>
        )}
        {gameState === "done" && (
          <div>
            <Trophy size={32} className="text-cyan-500 mx-auto mb-3" />
            <p className="text-3xl font-black mb-1">{score}</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">problems solved in 30 seconds</p>
            <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold transition-colors">
              <RotateCcw size={14} /> Play again
            </button>
          </div>
        )}
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
          Learn through play. Speed drills, flashcards, memory games, and
          code puzzles that make studying addictive.
        </p>
      </div>

      <div className="space-y-8">
        <TypingGame />
        <MemoryMatchGame />
        <CodePuzzleGame />
        <MathDrillGame />
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
