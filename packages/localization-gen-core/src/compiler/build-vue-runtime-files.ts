import type { LocalizationGenConfig } from "../types/config.js";
import type { RuntimeManifest } from "../types/manifest.js";
import { buildReactRuntimeFiles } from "./build-react-runtime-files.js";

export function buildVueRuntimeFiles(
  manifest: RuntimeManifest,
  config: Pick<LocalizationGenConfig, "class_name" | "generated">
): { entry: string; types: string } {
  // Runtime payload is framework-neutral; adapters handle framework bindings.
  return buildReactRuntimeFiles(manifest, config);
}