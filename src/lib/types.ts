export type Language = "python" | "javascript" | "cpp" | "java";

export interface Module {
  slug: string;
  title: string;
  description: string;
  order: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  icon: string;
  estimatedHours: number;
  lessons?: LessonMeta[];
}

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  moduleSlug: string;
  languages: Language[];
}

export interface LessonFull extends LessonMeta {
  content: string;
  codeExamples: Partial<Record<Language, string>>;
  audioUrl: string;
}

export interface ExecutionRequest {
  language: Language;
  code: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  error?: string;
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  python: "Python",
  javascript: "JavaScript",
  cpp: "C++",
  java: "Java",
};

export const LANGUAGE_MONACO_MAP: Record<Language, string> = {
  python: "python",
  javascript: "javascript",
  cpp: "cpp",
  java: "java",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};
