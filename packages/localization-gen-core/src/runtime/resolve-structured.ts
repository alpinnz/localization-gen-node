import { resolveContext } from "./resolve-context.js";
import { resolveGender } from "./resolve-gender.js";
import { resolvePlural } from "./resolve-plural.js";
import { interpolate } from "./interpolate.js";

/**
 * Parses the JSON payload emitted for structured localization entries.
 *
 * @param raw Serialized structured variants from runtime manifest messages.
 * @returns Object variant map when valid, otherwise `null`.
 *
 * @remarks
 * Structured entries are stored as JSON strings in the manifest. This helper
 * safely detects and parses those values while allowing plain strings to pass through.
 */
export function parseStructuredVariants(raw: string): Record<string, string> | null {
  if (!raw || raw[0] !== "{") {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Resolves a context-structured runtime value and optionally interpolates params.
 *
 * @param raw Raw runtime value (`JSON` for structured entries or plain string).
 * @param context Context key, for example `formal`, `casual`, `primary`.
 * @param params Placeholder parameters for interpolation.
 * @returns Resolved display string; returns `raw` unchanged when `raw` is not structured.
 */
export function resolveStructuredContext(
  raw: string,
  context: string,
  params?: Record<string, string | number>
): string {
  const variants = parseStructuredVariants(raw);
  if (!variants) {
    return raw;
  }
  return interpolate(resolveContext(variants, context), params);
}

/**
 * Resolves a gender-structured runtime value and interpolates placeholders.
 *
 * @param raw Raw runtime value (`JSON` for structured entries or plain string).
 * @param gender Gender selector (`male`, `female`, `other`, ...).
 * @param params Placeholder parameters for interpolation.
 * @returns Resolved display string; returns `raw` unchanged when `raw` is not structured.
 */
export function resolveStructuredGender(
  raw: string,
  gender: string,
  params?: Record<string, string | number>
): string {
  const variants = parseStructuredVariants(raw);
  if (!variants) {
    return raw;
  }
  return interpolate(resolveGender(variants, gender), params);
}

/**
 * Resolves a plural-structured runtime value and injects `count` into interpolation params.
 *
 * @param raw Raw runtime value (`JSON` for structured entries or plain string).
 * @param count Quantity used for plural branch selection.
 * @param params Additional placeholder parameters.
 * @returns Resolved display string; returns `raw` unchanged when `raw` is not structured.
 */
export function resolveStructuredPlural(
  raw: string,
  count: number,
  params?: Record<string, string | number>
): string {
  const variants = parseStructuredVariants(raw);
  if (!variants) {
    return raw;
  }
  return interpolate(resolvePlural(variants, count), { count, ...params });
}
