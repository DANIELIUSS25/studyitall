import { Language } from "./types";

// Try multiple free code execution APIs as fallbacks
const APIS = [
  {
    name: "Piston v2 (alternative host)",
    url: "https://piston.codeutility.io/api/v2/execute",
    buildBody: (language: string, version: string, code: string) => ({
      language,
      version,
      files: [{ content: code }],
    }),
    parseResponse: (data: Record<string, unknown>) => {
      const run = (data.run || {}) as Record<string, unknown>;
      return {
        stdout: (run.stdout as string) || "",
        stderr: (run.stderr as string) || "",
        exitCode: (run.code as number) ?? 1,
      };
    },
  },
  {
    name: "Piston (emkc)",
    url: "https://emkc.org/api/v2/piston/execute",
    buildBody: (language: string, version: string, code: string) => ({
      language,
      version,
      files: [{ content: code }],
    }),
    parseResponse: (data: Record<string, unknown>) => {
      const run = (data.run || {}) as Record<string, unknown>;
      return {
        stdout: (run.stdout as string) || "",
        stderr: (run.stderr as string) || "",
        exitCode: (run.code as number) ?? 1,
      };
    },
  },
];

const LANGUAGE_MAP: Record<Language, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  cpp: { language: "c++", version: "10.2.0" },
  java: { language: "java", version: "15.0.2" },
};

export async function executeCode(
  language: Language,
  code: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const config = LANGUAGE_MAP[language];
  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  // Try each API in order
  for (const api of APIS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(api.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          api.buildBody(config.language, config.version, code)
        ),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) continue;

      const data = await response.json();
      if (data.message) continue; // API returned an error message

      return api.parseResponse(data);
    } catch {
      continue;
    }
  }

  throw new Error(
    "All code execution services are currently unavailable. Please try again later."
  );
}
