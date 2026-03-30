import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Module, LessonMeta, LessonFull, Language } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getModules(): Module[] {
  const modulesPath = path.join(CONTENT_DIR, "modules.json");
  const raw = fs.readFileSync(modulesPath, "utf-8");
  const modules: Module[] = JSON.parse(raw);

  return modules
    .map((mod) => ({
      ...mod,
      lessons: getLessonsForModule(mod.slug),
    }))
    .sort((a, b) => a.order - b.order);
}

export function getModule(slug: string): Module | undefined {
  const modules = getModules();
  return modules.find((m) => m.slug === slug);
}

export function getLessonsForModule(moduleSlug: string): LessonMeta[] {
  const moduleDir = path.join(CONTENT_DIR, moduleSlug);

  if (!fs.existsSync(moduleDir)) return [];

  const files = fs
    .readdirSync(moduleDir)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const filePath = path.join(moduleDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);

      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "",
        description: data.description || "",
        order: data.order || 0,
        moduleSlug: data.moduleSlug || moduleSlug,
        languages: (data.languages || []) as Language[],
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string
): LessonFull | null {
  const filePath = path.join(CONTENT_DIR, moduleSlug, `${lessonSlug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: lessonSlug,
    title: data.title || "",
    description: data.description || "",
    order: data.order || 0,
    moduleSlug: data.moduleSlug || moduleSlug,
    languages: (data.languages || []) as Language[],
    content,
    codeExamples: (data.codeExamples || {}) as Partial<Record<Language, string>>,
    audioUrl: `/audio/${moduleSlug}/${lessonSlug}.mp3`,
  };
}

export function getAllLessonParams(): { moduleSlug: string; lessonSlug: string }[] {
  const modules = getModules();
  const params: { moduleSlug: string; lessonSlug: string }[] = [];

  for (const mod of modules) {
    if (mod.lessons) {
      for (const lesson of mod.lessons) {
        params.push({
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
        });
      }
    }
  }

  return params;
}

export function getAdjacentLessons(
  moduleSlug: string,
  lessonSlug: string
): { prev: { moduleSlug: string; lessonSlug: string; title: string } | null; next: { moduleSlug: string; lessonSlug: string; title: string } | null } {
  const modules = getModules();

  // Build flat ordered list of all lessons across all modules
  const allLessons: { moduleSlug: string; lessonSlug: string; title: string }[] = [];
  for (const mod of modules) {
    if (mod.lessons) {
      for (const lesson of mod.lessons) {
        allLessons.push({
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
          title: lesson.title,
        });
      }
    }
  }

  const currentIndex = allLessons.findIndex(
    (l) => l.moduleSlug === moduleSlug && l.lessonSlug === lessonSlug
  );

  return {
    prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
  };
}
