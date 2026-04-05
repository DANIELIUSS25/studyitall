import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/api-auth";
import { markLessonComplete, updateStreak, addXP, recordActivity } from "@/lib/kv";

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { moduleSlug, lessonSlug } = await request.json();
  if (!moduleSlug || !lessonSlug) {
    return NextResponse.json({ error: "moduleSlug and lessonSlug required" }, { status: 400 });
  }

  await markLessonComplete(user.id, moduleSlug, lessonSlug);
  await recordActivity(user.id);
  const streak = await updateStreak(user.id);
  const xp = await addXP(user.id, 10);

  return NextResponse.json({ success: true, xp, streak });
}
