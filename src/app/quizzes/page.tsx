import Link from "next/link";
import { Metadata } from "next";
import { QuizCard } from "@/components/quiz/QuizCard";
import type { QuizQuestion } from "@/components/quiz/QuizCard";
import { UpgradePrompt } from "@/components/upgrade/UpgradePrompt";

export const metadata: Metadata = {
  title: "Quizzes — Test Your Knowledge",
  description:
    "Free interactive quizzes on coding, AI, programming languages, and more. Test yourself and track your progress on StudyItAll.com.",
};

const PYTHON_QUIZ: QuizQuestion[] = [
  {
    question: "What will `print(type(42))` output in Python?",
    options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
    correctIndex: 0,
    explanation: "In Python, whole numbers are integers (`int`). Python doesn't have a generic 'number' type — it distinguishes between `int` and `float`.",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "func", "def", "fn"],
    correctIndex: 2,
    explanation: "Python uses `def` (short for 'define') to declare functions. `function` is used in JavaScript, and `fn` in Rust.",
  },
  {
    question: "What does `len([1, 2, 3])` return?",
    options: ["2", "3", "4", "Error"],
    correctIndex: 1,
    explanation: "The `len()` function returns the number of items in a collection. This list has 3 elements, so `len()` returns 3.",
  },
  {
    question: "Which data structure uses key-value pairs in Python?",
    options: ["List", "Tuple", "Set", "Dictionary"],
    correctIndex: 3,
    explanation: "A Python dictionary (`dict`) stores data as key-value pairs, like `{'name': 'Alice', 'age': 25}`. Lists, tuples, and sets store values without keys.",
  },
  {
    question: "What is the output of `'hello'[1]` in Python?",
    options: ["h", "e", "l", "Error"],
    correctIndex: 1,
    explanation: "Python strings are zero-indexed. Index 0 is 'h', index 1 is 'e'. So `'hello'[1]` returns 'e'.",
  },
];

const AI_QUIZ: QuizQuestion[] = [
  {
    question: "What does 'ML' stand for in the context of AI?",
    options: ["Meta Language", "Machine Learning", "Markup Language", "Memory Logic"],
    correctIndex: 1,
    explanation: "ML stands for Machine Learning — the field of AI focused on algorithms that learn from data to make predictions or decisions.",
  },
  {
    question: "Which of these is an example of supervised learning?",
    options: [
      "A robot exploring a maze by trial and error",
      "Grouping customers by purchase behavior",
      "Training a model to recognize cats in photos using labeled images",
      "Generating new music from patterns",
    ],
    correctIndex: 2,
    explanation: "Supervised learning uses labeled training data (images tagged as 'cat' or 'not cat') to teach a model. The others describe reinforcement learning, clustering, and generative models.",
  },
  {
    question: "What is a neural network inspired by?",
    options: ["Computer circuits", "The human brain", "The internet", "Database tables"],
    correctIndex: 1,
    explanation: "Neural networks are loosely inspired by biological neurons in the human brain, with connected nodes that process and transmit information.",
  },
  {
    question: "What is 'prompt engineering'?",
    options: [
      "Writing code that compiles faster",
      "Designing hardware for AI chips",
      "Crafting effective inputs for AI language models",
      "Building database queries",
    ],
    correctIndex: 2,
    explanation: "Prompt engineering is the skill of writing effective prompts (inputs) for AI language models to get better, more accurate outputs.",
  },
];

const JS_QUIZ: QuizQuestion[] = [
  {
    question: "What does `typeof null` return in JavaScript?",
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correctIndex: 2,
    explanation: "This is a well-known JavaScript quirk. `typeof null` returns 'object', which is actually a bug from the original JavaScript implementation that was never fixed.",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctIndex: 0,
    explanation: "`push()` adds to the end, `pop()` removes from the end, `unshift()` adds to the beginning, and `shift()` removes from the beginning.",
  },
  {
    question: "What is the difference between `==` and `===`?",
    options: [
      "No difference",
      "`===` is faster",
      "`==` compares types, `===` compares values",
      "`===` checks both value and type, `==` only checks value",
    ],
    correctIndex: 3,
    explanation: "The strict equality operator `===` checks both value and type without conversion. `==` performs type coercion before comparing, which can lead to surprising results like `'1' == 1` being true.",
  },
];

export default function QuizzesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Quizzes
        </h1>
        <p className="mt-3 text-lg text-[var(--muted-foreground)]">
          Test your knowledge with interactive quizzes. Instant feedback and
          explanations for every answer.
        </p>
      </div>

      <div className="space-y-10">
        <QuizCard title="Python Fundamentals" questions={PYTHON_QUIZ} />
        <QuizCard title="AI & Machine Learning Basics" questions={AI_QUIZ} />
        <QuizCard title="JavaScript Essentials" questions={JS_QUIZ} />
      </div>

      <div className="mt-10">
        <UpgradePrompt variant="quiz-limit" />
      </div>

      <div className="mt-10 p-8 rounded-2xl border border-[var(--border)] bg-[var(--muted)] text-center">
        <h3 className="text-xl font-bold mb-2">Want to learn more?</h3>
        <p className="text-[var(--muted-foreground)] mb-6">
          Quizzes are great for review, but real learning happens in our
          interactive lessons.
        </p>
        <Link
          href="/coding"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-semibold transition-colors"
        >
          Start the coding path
        </Link>
      </div>
    </div>
  );
}
