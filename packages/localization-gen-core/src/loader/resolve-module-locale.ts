import { basename, dirname } from "node:path";

export function resolveModuleLocale(filePath: string): { module: string; locale: string } {
  const module = basename(dirname(filePath));
  const locale = basename(filePath).replace(/\.json$/u, "");
  if (!module || !locale) {
    throw new Error(`Could not resolve module/locale from path: ${filePath}`);
  }
  return { module, locale };
}

