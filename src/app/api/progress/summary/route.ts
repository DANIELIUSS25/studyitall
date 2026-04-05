import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/api-auth";
import { getCompletedLessons, getAllQuizScores, getStreak, getXP, getRecentActivity } from "@/lib/kv";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [completedLessons, quizScores, streak, xp, recentActivity] = await Promise.all([
    getCompletedLessons(user.id),
    getAllQuizScores(user.id),
    getStreak(user.id),
    getXP(user.id),
    getRecentActivity(user.id, 30),
  ]);

  return NextResponse.json({
    completedLessons,
    quizScores,
    streak,
    xp,
    recentActivity,
  });
}
