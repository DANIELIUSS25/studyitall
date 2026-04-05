import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/api-auth";
import { getCompletedLessons } from "@/lib/kv";

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const lessonsParam = request.nextUrl.searchParams.get("lessons");
  const completed = await getCompletedLessons(user.id);

  if (lessonsParam) {
    const requested = lessonsParam.split(",");
    const matching = requested.filter((l) => completed.includes(l));
    return NextResponse.json({ completed: matching });
  }

  return NextResponse.json({ completed });
}
