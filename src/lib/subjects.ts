export interface Subject {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  topicCount: number;
  lessonCount: number;
  comingSoon?: boolean;
}

export const SUBJECTS: Subject[] = [
  {
    slug: "coding",
    name: "Coding",
    tagline: "Build anything with code",
    description:
      "Master Python, JavaScript, C++, and Java with interactive lessons, a live code editor, and audio narration. From your first program to system design.",
    icon: "Code2",
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-600",
    topicCount: 12,
    lessonCount: 50,
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    tagline: "From arithmetic to calculus",
    description:
      "Build a rock-solid math foundation. Master algebra, geometry, trigonometry, statistics, and calculus with visual explanations and practice problems.",
    icon: "Calculator",
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    topicCount: 10,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "science",
    name: "Science",
    tagline: "Understand the natural world",
    description:
      "Explore physics, chemistry, and biology through clear explanations, real-world examples, and interactive simulations. Science made approachable.",
    icon: "FlaskConical",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
    topicCount: 8,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "history",
    name: "History",
    tagline: "Learn from the past",
    description:
      "Journey through world history from ancient civilizations to the modern era. Understand the events, people, and ideas that shaped our world.",
    icon: "Landmark",
    color: "text-amber-500",
    gradient: "from-amber-500 to-orange-500",
    topicCount: 9,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "english",
    name: "English",
    tagline: "Master reading & writing",
    description:
      "Strengthen your grammar, expand your vocabulary, improve reading comprehension, and develop powerful writing skills for academic and professional success.",
    icon: "BookText",
    color: "text-rose-500",
    gradient: "from-rose-500 to-pink-500",
    topicCount: 7,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "spanish",
    name: "Spanish",
    tagline: "Habla espa\u00f1ol",
    description:
      "Learn Spanish from scratch or sharpen your skills. Vocabulary, grammar, conversation practice, and cultural context to become conversational.",
    icon: "Languages",
    color: "text-red-500",
    gradient: "from-red-500 to-yellow-500",
    topicCount: 8,
    lessonCount: 0,
    comingSoon: true,
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}
