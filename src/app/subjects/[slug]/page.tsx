import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Code2,
  Calculator,
  FlaskConical,
  Landmark,
  BookText,
  Languages,
  Brain,
} from "lucide-react";
import { SUBJECTS, getSubject } from "@/lib/subjects";
import { Metadata } from "next";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={40} />,
  Brain: <Brain size={40} />,
  Calculator: <Calculator size={40} />,
  FlaskConical: <FlaskConical size={40} />,
  Landmark: <Landmark size={40} />,
  BookText: <BookText size={40} />,
  Languages: <Languages size={40} />,
};

interface PageParams {
  slug: string;
}

export function generateStaticParams() {
  return SUBJECTS.filter((s) => s.slug !== "coding").map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return { title: "Subject Not Found" };
  return {
    title: `Learn ${subject.name}`,
    description: subject.description,
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  // Coding has its own dedicated page
  if (slug === "coding") {
    notFound();
  }

  const subject = getSubject(slug);
  if (!subject) notFound();

  // Sample topics for each subject
  const TOPIC_MAP: Record<string, string[]> = {
    ai: [
      "What is Artificial Intelligence?",
      "Machine Learning Fundamentals",
      "Supervised vs Unsupervised Learning",
      "Neural Networks & Deep Learning",
      "Natural Language Processing",
      "Computer Vision Basics",
      "Prompt Engineering",
      "Building AI Applications with Python",
      "Ethics in AI",
      "Deploying ML Models",
    ],
    mathematics: [
      "Arithmetic & Number Sense",
      "Pre-Algebra",
      "Algebra I & II",
      "Geometry",
      "Trigonometry",
      "Statistics & Probability",
      "Pre-Calculus",
      "Calculus I",
      "Calculus II",
      "Linear Algebra",
    ],
    science: [
      "Scientific Method",
      "Physics: Mechanics",
      "Physics: Waves & Optics",
      "Chemistry: Atoms & Elements",
      "Chemistry: Reactions",
      "Biology: Cells & Genetics",
      "Biology: Ecology",
      "Earth Science",
    ],
    history: [
      "Ancient Civilizations",
      "Classical Greece & Rome",
      "Medieval World",
      "Renaissance & Reformation",
      "Age of Exploration",
      "American Revolution",
      "Industrial Revolution",
      "World Wars",
      "Modern Era",
    ],
    english: [
      "Grammar Foundations",
      "Punctuation & Mechanics",
      "Vocabulary Building",
      "Reading Comprehension",
      "Essay Writing",
      "Research & Citations",
      "Creative Writing",
    ],
    spanish: [
      "Basics & Pronunciation",
      "Common Phrases",
      "Present Tense Verbs",
      "Nouns & Adjectives",
      "Past Tenses",
      "Future & Conditional",
      "Conversational Spanish",
      "Culture & Context",
    ],
    thai: [
      "The Thai Alphabet (44 Consonants)",
      "Vowels & Tone Marks",
      "The Five Tones of Thai",
      "Greetings & Polite Expressions",
      "Numbers & Counting",
      "Everyday Phrases & Questions",
      "Reading Thai Script",
      "Thai Culture & Etiquette",
    ],
  };

  const topics = TOPIC_MAP[slug] || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to subjects
      </Link>

      {/* Subject header */}
      <div className="text-center mb-12">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center text-white mx-auto mb-6`}
        >
          {ICON_MAP[subject.icon]}
        </div>
        <h1 className="text-4xl font-bold mb-3">{subject.name}</h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-xl mx-auto">
          {subject.description}
        </p>
      </div>

      {/* Coming soon banner */}
      <div className="bg-gradient-to-br from-brand-500/10 to-purple-500/10 border border-brand-500/20 rounded-2xl p-8 text-center mb-12">
        <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 mx-auto mb-4">
          <Bell size={28} />
        </div>
        <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
        <p className="text-[var(--muted-foreground)] mb-6 max-w-lg mx-auto">
          We&apos;re building comprehensive {subject.name.toLowerCase()} lessons with
          the same interactive quality as our coding curriculum. Full audio
          narration, practice problems, and structured paths.
        </p>
        <Link
          href="/coding"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
        >
          Try Coding While You Wait
        </Link>
      </div>

      {/* Planned topics preview */}
      {topics.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Planned Topics</h2>
          <p className="text-[var(--muted-foreground)] mb-6">
            Here&apos;s what we&apos;re working on for the {subject.name.toLowerCase()}{" "}
            curriculum:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map((topic, idx) => (
              <div
                key={topic}
                className="flex items-center gap-3 p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]"
              >
                <span className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center text-sm font-medium shrink-0">
                  {idx + 1}
                </span>
                <span className="font-medium text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
