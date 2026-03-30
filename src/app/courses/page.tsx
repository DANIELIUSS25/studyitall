import Link from "next/link";
import {
  Code2,
  Brain,
  Calculator,
  FlaskConical,
  Landmark,
  BookText,
  Languages,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses — Free Online Learning",
  description:
    "Browse all free courses on StudyItAll.com. Coding, AI, mathematics, science, history, English, Spanish, Thai, and more.",
};

const COURSES = [
  {
    slug: "/coding",
    title: "Complete Coding Bootcamp",
    description: "Master Python, JavaScript, C++, and Java from scratch. 12 modules with live code editor.",
    icon: <Code2 size={24} />,
    modules: 12,
    hours: 240,
    level: "Beginner to Advanced",
    available: true,
    features: ["Live code editor", "4 languages", "Audio lessons", "Real projects"],
  },
  {
    slug: "/subjects/ai",
    title: "AI & Machine Learning",
    description: "Understand neural networks, prompt engineering, and how to build AI-powered applications.",
    icon: <Brain size={24} />,
    modules: 10,
    hours: 180,
    level: "Beginner to Advanced",
    available: false,
    features: ["Python-based", "Hands-on projects", "Model deployment", "Prompt engineering"],
  },
  {
    slug: "/subjects/mathematics",
    title: "Mathematics",
    description: "From basic arithmetic through calculus and linear algebra with visual explanations.",
    icon: <Calculator size={24} />,
    modules: 10,
    hours: 200,
    level: "Beginner to Advanced",
    available: false,
    features: ["Visual explanations", "Practice problems", "Step-by-step solutions"],
  },
  {
    slug: "/subjects/science",
    title: "Science",
    description: "Physics, chemistry, and biology with real-world examples and interactive simulations.",
    icon: <FlaskConical size={24} />,
    modules: 8,
    hours: 160,
    level: "Beginner to Intermediate",
    available: false,
    features: ["Physics", "Chemistry", "Biology", "Lab simulations"],
  },
  {
    slug: "/subjects/history",
    title: "World History",
    description: "Ancient civilizations to the modern era. Events, people, and ideas that shaped our world.",
    icon: <Landmark size={24} />,
    modules: 9,
    hours: 150,
    level: "All Levels",
    available: false,
    features: ["Timeline-based", "Primary sources", "Audio narration"],
  },
  {
    slug: "/subjects/english",
    title: "English Language",
    description: "Grammar, vocabulary, reading comprehension, and writing skills for academic success.",
    icon: <BookText size={24} />,
    modules: 7,
    hours: 120,
    level: "Beginner to Advanced",
    available: false,
    features: ["Grammar drills", "Essay writing", "Vocabulary builder"],
  },
  {
    slug: "/subjects/spanish",
    title: "Spanish",
    description: "Learn Spanish from zero to conversational with vocabulary, grammar, and cultural context.",
    icon: <Languages size={24} />,
    modules: 8,
    hours: 140,
    level: "Beginner to Intermediate",
    available: false,
    features: ["Audio pronunciation", "Conversation practice", "Cultural context"],
  },
  {
    slug: "/subjects/thai",
    title: "Thai",
    description: "Master the Thai alphabet, tones, and everyday phrases. Audio-guided pronunciation.",
    icon: <Languages size={24} />,
    modules: 8,
    hours: 140,
    level: "Beginner to Intermediate",
    available: false,
    features: ["Thai alphabet", "Tone practice", "Audio guides", "Cultural context"],
  },
];

export default function CoursesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Courses
        </h1>
        <p className="mt-3 text-lg text-[var(--muted-foreground)] max-w-xl">
          Structured learning paths from beginner to advanced. Every course is
          free, with interactive lessons and audio narration.
        </p>
      </div>

      <div className="space-y-4">
        {COURSES.map((course) => (
          <Link
            key={course.slug}
            href={course.slug}
            className="group block rounded-2xl border border-[var(--border)] hover:bg-[var(--muted)] transition-all overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    course.available
                      ? "bg-brand-500 text-white"
                      : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                  }`}
                >
                  {course.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold group-hover:text-brand-500 transition-colors">
                      {course.title}
                    </h2>
                    {course.available ? (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        Available
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                        Coming 2026
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--muted-foreground)] text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.modules} modules &middot; ~{course.hours}h
                    </span>
                    <span>{course.level}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {course.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[var(--muted)] border border-[var(--border)]"
                      >
                        <CheckCircle2 size={10} className="text-brand-500" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <ArrowRight
                  size={20}
                  className="text-[var(--border)] group-hover:text-brand-500 shrink-0 mt-1 transition-colors hidden sm:block"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
