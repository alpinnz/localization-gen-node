import type { Diagnostic } from "../types/diagnostics.js";
import { formatDiagnostic } from "./format-diagnostic.js";

export function renderTerminalReport(diagnostics: Diagnostic[]): string {
  if (diagnostics.length === 0) {
    return "No diagnostics.";
  }
  return diagnostics.map(formatDiagnostic).join("\n");
}

