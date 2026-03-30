"use client";

import { useState, useCallback, useRef } from "react";
import { Language, ExecutionResult } from "@/lib/types";

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (config: { batched: (text: string) => void }) => void;
  setStderr: (config: { batched: (text: string) => void }) => void;
}

function executeJavaScriptLocally(code: string): ExecutionResult {
  const logs: string[] = [];
  const errors: string[] = [];

  const mockConsole = {
    log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
    error: (...args: unknown[]) => errors.push(args.map(String).join(" ")),
    warn: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
    info: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
  };

  try {
    const fn = new Function("console", code);
    fn(mockConsole);
    return {
      stdout: logs.join("\n"),
      stderr: errors.join("\n"),
      exitCode: 0,
    };
  } catch (error) {
    return {
      stdout: logs.join("\n"),
      stderr: error instanceof Error ? error.message : String(error),
      exitCode: 1,
    };
  }
}

export function useCodeExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const pyodideRef = useRef<PyodideInterface | null>(null);
  const pyodideLoadingRef = useRef<Promise<PyodideInterface> | null>(null);

  const loadPyodide = useCallback(async (): Promise<PyodideInterface> => {
    if (pyodideRef.current) return pyodideRef.current;

    if (pyodideLoadingRef.current) return pyodideLoadingRef.current;

    pyodideLoadingRef.current = (async () => {
      // Load pyodide script
      if (!window.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Pyodide"));
          document.head.appendChild(script);
        });
      }

      const pyodide = await window.loadPyodide!({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
      });
      pyodideRef.current = pyodide;
      return pyodide;
    })();

    return pyodideLoadingRef.current;
  }, []);

  const executePython = useCallback(async (code: string): Promise<ExecutionResult> => {
    try {
      const pyodide = await loadPyodide();

      const stdoutLines: string[] = [];
      const stderrLines: string[] = [];

      pyodide.setStdout({ batched: (text: string) => stdoutLines.push(text) });
      pyodide.setStderr({ batched: (text: string) => stderrLines.push(text) });

      try {
        await pyodide.runPythonAsync(code);
        return {
          stdout: stdoutLines.join("\n"),
          stderr: stderrLines.join("\n"),
          exitCode: 0,
        };
      } catch (error) {
        return {
          stdout: stdoutLines.join("\n"),
          stderr: error instanceof Error ? error.message : String(error),
          exitCode: 1,
        };
      }
    } catch (error) {
      return {
        stdout: "",
        stderr: `Failed to initialize Python runtime: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: 1,
      };
    }
  }, [loadPyodide]);

  const execute = useCallback(async (language: Language, code: string) => {
    setIsRunning(true);
    setOutput(null);

    try {
      let result: ExecutionResult;

      switch (language) {
        case "javascript":
          result = executeJavaScriptLocally(code);
          break;
        case "python":
          result = await executePython(code);
          break;
        case "cpp":
        case "java":
          // Try server API for C++/Java
          try {
            const response = await fetch("/api/execute", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ language, code }),
            });
            const data = await response.json();
            if (response.ok && !data.error) {
              result = data;
            } else {
              result = {
                stdout: "",
                stderr: `${language === "cpp" ? "C++" : "Java"} execution requires a server backend.\n\nTo run this code:\n1. Copy the code above\n2. Paste it into an online IDE like replit.com or onlinegdb.com\n3. Or install ${language === "cpp" ? "g++" : "javac"} locally\n\nPython and JavaScript run directly in your browser!`,
                exitCode: 1,
              };
            }
          } catch {
            result = {
              stdout: "",
              stderr: `${language === "cpp" ? "C++" : "Java"} execution requires a server backend.\n\nTo run this code:\n1. Copy the code above\n2. Paste it into an online IDE like replit.com or onlinegdb.com\n3. Or install ${language === "cpp" ? "g++" : "javac"} locally\n\nPython and JavaScript run directly in your browser!`,
              exitCode: 1,
            };
          }
          break;
        default:
          result = {
            stdout: "",
            stderr: "Unsupported language",
            exitCode: 1,
          };
      }

      setOutput(result);
    } finally {
      setIsRunning(false);
    }
  }, [executePython]);

  const clear = useCallback(() => {
    setOutput(null);
  }, []);

  return { isRunning, output, execute, clear };
}
