#!/usr/bin/env node
import { runInit } from "./init.js";
import { runGenerate } from "./generate.js";
import { runValidate } from "./validate.js";
import { runClean } from "./clean.js";
import { runCoverage } from "./coverage.js";

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);

  if (command === "init") {
    await runInit();
    return;
  }
  if (command === "generate") {
    await runGenerate({ watch: rest.includes("--watch") });
    return;
  }
  if (command === "validate") {
    await runValidate();
    return;
  }
  if (command === "clean") {
    await runClean();
    return;
  }
  if (command === "coverage") {
    const formatArg = rest.find((arg) => arg.startsWith("--format="));
    const outputArg = rest.find((arg) => arg.startsWith("--output="));
    await runCoverage({
      format: formatArg ? (formatArg.replace("--format=", "") as "json" | "html") : undefined,
      output: outputArg ? outputArg.replace("--output=", "") : undefined
    });
    return;
  }

  throw new Error(`Unknown command: ${command ?? "<none>"}`);
}

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});

