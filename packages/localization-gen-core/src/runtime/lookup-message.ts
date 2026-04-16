import type { RuntimeContext } from "./types.js";

/**
 * Looks up a translation value for a fully-qualified message key.
 *
 * @param context Runtime locale context.
 * @param key Flattened message key, for example `common.strings.app_title`.
 * @returns
 * 1) value from `context.locale`, or
 * 2) value from `context.fallbackLocale`, or
 * 3) the original `key` when missing in both locales.
 *
 * @remarks
 * Returning the key for missing values makes untranslated keys visible in UI,
 * which is generally easier to debug than returning an empty string.
 */
export function lookupMessage(context: RuntimeContext, key: string): string {
  return context.messages[context.locale]?.[key] ?? context.messages[context.fallbackLocale]?.[key] ?? key;
}
