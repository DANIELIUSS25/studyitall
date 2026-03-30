import { NextRequest, NextResponse } from "next/server";
import { executeCode } from "@/lib/piston";
import { Language } from "@/lib/types";

const VALID_LANGUAGES: Language[] = ["python", "javascript", "cpp", "java"];
const MAX_CODE_LENGTH = 10000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, code } = body;

    if (!language || !VALID_LANGUAGES.includes(language)) {
      return NextResponse.json(
        { error: `Invalid language. Must be one of: ${VALID_LANGUAGES.join(", ")}` },
        { status: 400 }
      );
    }

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Code is required and must be a string" },
        { status: 400 }
      );
    }

    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        { error: `Code exceeds maximum length of ${MAX_CODE_LENGTH} characters` },
        { status: 400 }
      );
    }

    const result = await executeCode(language as Language, code);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Code execution timed out (10s limit)" },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: "Failed to execute code. Please try again." },
      { status: 500 }
    );
  }
}
