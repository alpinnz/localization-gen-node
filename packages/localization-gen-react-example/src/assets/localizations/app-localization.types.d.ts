/**
 * One flattened localization key metadata entry.
 * - key: fully-qualified key (module.path.to.leaf)
 * - placeholders: interpolation variable names used by the message
 */
export interface RuntimeManifestEntry {
    key: string;
    placeholders: string[];
}
/**
 * Runtime manifest consumed by adapter/provider at application runtime.
 */
export interface AppLocalizationManifest {
    /** Default locale used when app starts. */
    base_locale: string;
    /** Locale used when key is missing in active locale. */
    fallback_locale: string;
    /** Locales included in the generated payload. */
    locales: string[];
    /** Flattened key metadata used to build helper accessors. */
    entries: RuntimeManifestEntry[];
    /** Per-locale flat key/value message map. */
    messages: Record<string, Record<string, string>>;
}
