import type { RuntimeManifest } from "localization-gen-core";

export function createLazyLocaleLoader(manifest: RuntimeManifest) {
  return async (locale: string): Promise<Record<string, string>> => manifest.messages[locale] ?? {};
}

