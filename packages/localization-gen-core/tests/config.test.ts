import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { loadConfig } from "../src/config/load-config.js";

const tempDirs: string[] = [];

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("config", () => {
  it("rejects legacy field_rename setting", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "localization-gen-config-"));
    tempDirs.push(cwd);

    await writeFile(
      join(cwd, "localization-gen.yaml"),
      [
        "input_dir: assets/localizations",
        "output_dir: src/assets/localizations",
        "framework: react",
        "field_rename: camel"
      ].join("\n") + "\n",
      "utf8"
    );

    await expect(loadConfig(cwd)).rejects.toThrow(/field_rename is no longer supported/u);
  });

  it("rejects legacy file_extension setting", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "localization-gen-config-"));
    tempDirs.push(cwd);

    await writeFile(
      join(cwd, "localization-gen.yaml"),
      [
        "input_dir: assets/localizations",
        "output_dir: src/assets/localizations",
        "framework: react",
        "file_extension: jsonc"
      ].join("\n") + "\n",
      "utf8"
    );

    await expect(loadConfig(cwd)).rejects.toThrow(/file_extension is no longer supported/u);
  });

  it("rejects invalid namespace_prefix value", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "localization-gen-config-"));
    tempDirs.push(cwd);

    await writeFile(
      join(cwd, "localization-gen.yaml"),
      [
        "input_dir: assets/localizations",
        "output_dir: src/assets/localizations",
        "framework: react",
        "namespace_prefix: invalid"
      ].join("\n") + "\n",
      "utf8"
    );

    await expect(loadConfig(cwd)).rejects.toThrow(/namespace_prefix must be/u);
  });

  it("accepts namespace_prefix: none", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "localization-gen-config-"));
    tempDirs.push(cwd);

    await writeFile(
      join(cwd, "localization-gen.yaml"),
      [
        "input_dir: assets/localizations",
        "output_dir: src/assets/localizations",
        "framework: react",
        "namespace_prefix: none"
      ].join("\n") + "\n",
      "utf8"
    );

    const config = await loadConfig(cwd);
    expect(config.namespace_prefix).toBe("none");
  });
});

