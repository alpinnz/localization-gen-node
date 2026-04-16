import { runGenerate } from "./generate.js";

export async function runWatch(options: { cwd?: string } = {}): Promise<void> {
  await runGenerate({ cwd: options.cwd, watch: true });
}

