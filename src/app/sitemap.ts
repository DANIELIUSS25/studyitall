import { MetadataRoute } from "next";
import { getAllLessonParams } from "@/lib/content";
import { getAllPostSlugs } from "@/lib/blog";
import { SUBJECTS } from "@/lib/subjects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://studyitall.com";

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/coding`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/curriculum`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/quizzes`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Subject pages
  const subjectPages = SUBJECTS.filter((s) => s.slug !== "coding").map((s) => ({
    url: `${baseUrl}/subjects/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Lesson pages
  const lessonPages = getAllLessonParams().map((p) => ({
    url: `${baseUrl}/lesson/${p.moduleSlug}/${p.lessonSlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages = getAllPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...subjectPages, ...lessonPages, ...blogPages];
}
