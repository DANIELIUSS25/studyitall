export interface Subject {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  /** Tailwind bg class for icon circle */
  iconBg: string;
  /** Tailwind text class for icon */
  iconColor: string;
  /** Tailwind bg class for card left-stripe */
  stripe: string;
  topicCount: number;
  lessonCount: number;
  comingSoon?: boolean;
}

export const SUBJECTS: Subject[] = [
  {
    slug: "coding",
    name: "Coding",
    tagline: "Python, JavaScript, C++, Java",
    description:
      "Master four languages with a live code editor, audio narration, and 12 structured modules.",
    icon: "Code2",
    iconBg: "bg-blue-100 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    stripe: "bg-blue-500",
    topicCount: 12,
    lessonCount: 50,
  },
  {
    slug: "ai",
    name: "Artificial Intelligence",
    tagline: "Machine learning, neural nets, prompt engineering",
    description:
      "From fundamentals to deploying real models. Learn to build with AI.",
    icon: "Brain",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    stripe: "bg-violet-500",
    topicCount: 10,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    tagline: "Algebra through calculus and statistics",
    description:
      "Visual explanations and practice problems from arithmetic to linear algebra.",
    icon: "Calculator",
    iconBg: "bg-cyan-100 dark:bg-cyan-500/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    stripe: "bg-cyan-500",
    topicCount: 10,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "science",
    name: "Science",
    tagline: "Physics, chemistry, biology",
    description:
      "Real-world examples and interactive simulations across three core sciences.",
    icon: "FlaskConical",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    stripe: "bg-emerald-500",
    topicCount: 8,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "history",
    name: "History",
    tagline: "Ancient civilizations to the modern era",
    description:
      "Events, people, and ideas that shaped our world. Timeline-based learning.",
    icon: "Landmark",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    stripe: "bg-amber-500",
    topicCount: 9,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "english",
    name: "English",
    tagline: "Grammar, vocabulary, writing",
    description:
      "Strengthen reading comprehension and develop powerful writing skills.",
    icon: "BookText",
    iconBg: "bg-rose-100 dark:bg-rose-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
    stripe: "bg-rose-500",
    topicCount: 7,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "spanish",
    name: "Spanish",
    tagline: "Vocabulary, grammar, conversation",
    description:
      "Learn Spanish from scratch with audio pronunciation and cultural context.",
    icon: "Languages",
    iconBg: "bg-orange-100 dark:bg-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    stripe: "bg-orange-500",
    topicCount: 8,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "thai",
    name: "Thai",
    tagline: "Alphabet, tones, phrases",
    description:
      "Master the Thai alphabet, five tones, and everyday conversation.",
    icon: "Languages",
    iconBg: "bg-sky-100 dark:bg-sky-500/20",
    iconColor: "text-sky-600 dark:text-sky-400",
    stripe: "bg-sky-500",
    topicCount: 8,
    lessonCount: 0,
    comingSoon: true,
  },
  {
    slug: "chess",
    name: "Chess",
    tagline: "Openings, tactics, strategy",
    description:
      "Learn chess from the rules to advanced strategy. Openings, middlegame tactics, endgame technique, and positional play.",
    icon: "Crown",
    iconBg: "bg-stone-100 dark:bg-stone-500/20",
    iconColor: "text-stone-600 dark:text-stone-400",
    stripe: "bg-stone-500",
    topicCount: 10,
    lessonCount: 0,
    comingSoon: true,
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}
