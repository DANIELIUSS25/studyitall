import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/api-auth";
import { saveQuizScore, getQuizScore, updateStreak, addXP, recordActivity } from "@/lib/kv";

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { quizId, score, total } = await request.json();
  if (!quizId || score === undefined || !total) {
    return NextResponse.json({ error: "quizId, score, and total required" }, { status: 400 });
  }

  const bestScore = await saveQuizScore(user.id, quizId, score, total);
  await recordActivity(user.id);
  const streak = await updateStreak(user.id);
  const xp = await addXP(user.id, score * 5);

  return NextResponse.json({ success: true, bestScore, xp, streak });
}

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const quizId = request.nextUrl.searchParams.get("quizId");
  if (!quizId) return NextResponse.json({ error: "quizId required" }, { status: 400 });

  const data = await getQuizScore(user.id, quizId);
  return NextResponse.json(data || { score: 0, total: 0, bestScore: 0 });
}
