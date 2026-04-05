import { kv } from "@vercel/kv";

// ── Keys ──
const keys = {
  completed: (uid: string) => `user:${uid}:completed`,
  quizScores: (uid: string) => `user:${uid}:quizScores`,
  streak: (uid: string) => `user:${uid}:streak`,
  xp: (uid: string) => `user:${uid}:xp`,
  activity: (uid: string) => `user:${uid}:activity`,
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// ── Lesson completion ──
export async function markLessonComplete(uid: string, moduleSlug: string, lessonSlug: string) {
  await kv.sadd(keys.completed(uid), `${moduleSlug}/${lessonSlug}`);
}

export async function isLessonComplete(uid: string, moduleSlug: string, lessonSlug: string): Promise<boolean> {
  return (await kv.sismember(keys.completed(uid), `${moduleSlug}/${lessonSlug}`)) === 1;
}

export async function getCompletedLessons(uid: string): Promise<string[]> {
  return (await kv.smembers(keys.completed(uid))) || [];
}

// ── Quiz scores ──
export async function saveQuizScore(uid: string, quizId: string, score: number, total: number) {
  const existing = await kv.hget<string>(keys.quizScores(uid), quizId);
  let bestScore = score;
  if (existing) {
    const prev = JSON.parse(existing);
    bestScore = Math.max(score, prev.bestScore || 0);
  }
  await kv.hset(keys.quizScores(uid), {
    [quizId]: JSON.stringify({ score, total, bestScore, date: today() }),
  });
  return bestScore;
}

export async function getQuizScore(uid: string, quizId: string) {
  const raw = await kv.hget<string>(keys.quizScores(uid), quizId);
  if (!raw) return null;
  return JSON.parse(raw) as { score: number; total: number; bestScore: number; date: string };
}

export async function getAllQuizScores(uid: string) {
  const raw = await kv.hgetall<Record<string, string>>(keys.quizScores(uid));
  if (!raw) return {};
  const result: Record<string, { score: number; total: number; bestScore: number; date: string }> = {};
  for (const [k, v] of Object.entries(raw)) {
    result[k] = JSON.parse(v);
  }
  return result;
}

// ── Streak ──
export async function updateStreak(uid: string) {
  const data = await kv.hgetall<{ current: string; longest: string; lastActiveDate: string }>(keys.streak(uid));

  const todayStr = today();
  const yesterdayStr = yesterday();

  let current = 1;
  let longest = 1;

  if (data) {
    const prev = {
      current: parseInt(data.current || "0"),
      longest: parseInt(data.longest || "0"),
      lastActiveDate: data.lastActiveDate || "",
    };

    if (prev.lastActiveDate === todayStr) {
      return { current: prev.current, longest: prev.longest };
    } else if (prev.lastActiveDate === yesterdayStr) {
      current = prev.current + 1;
    } else {
      current = 1;
    }
    longest = Math.max(current, prev.longest);
  }

  await kv.hset(keys.streak(uid), {
    current: current.toString(),
    longest: longest.toString(),
    lastActiveDate: todayStr,
  });

  return { current, longest };
}

export async function getStreak(uid: string) {
  const data = await kv.hgetall<{ current: string; longest: string; lastActiveDate: string }>(keys.streak(uid));
  if (!data) return { current: 0, longest: 0 };

  const todayStr = today();
  const yesterdayStr = yesterday();
  const current = parseInt(data.current || "0");
  const longest = parseInt(data.longest || "0");

  // If lastActiveDate is not today or yesterday, streak is broken
  if (data.lastActiveDate !== todayStr && data.lastActiveDate !== yesterdayStr) {
    return { current: 0, longest };
  }

  return { current, longest };
}

// ── XP ──
export async function addXP(uid: string, amount: number) {
  return kv.incrby(keys.xp(uid), amount);
}

export async function getXP(uid: string): Promise<number> {
  return (await kv.get<number>(keys.xp(uid))) || 0;
}

// ── Activity ──
export async function recordActivity(uid: string) {
  const todayStr = today();
  await kv.zadd(keys.activity(uid), { score: Date.now(), member: todayStr });
}

export async function getRecentActivity(uid: string, days: number = 30): Promise<string[]> {
  // Get all activity entries and filter by date
  const members = await kv.zrange(keys.activity(uid), 0, -1);
  if (!members || members.length === 0) return [];

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  return (members as string[]).filter((m) => m >= cutoffStr);
}
