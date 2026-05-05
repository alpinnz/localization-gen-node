/**
 * Options accepted by `LocalizationModule.forRoot()`.
 */
export interface LocalizationModuleOptions {
  /**
   * Whether the module should be registered as global.
   * When `true`, `LocalizationService` is available without importing
   * `LocalizationModule` in every feature module.
   * @default false
   */
  isGlobal?: boolean;

  /**
   * Request header name used to detect the active locale.
   * Checked before `Accept-Language`.
   * @example "x-locale"
   */
  localeHeader?: string;

  /**
   * Query parameter name used to detect the active locale.
   * @example "lang"
   * @default "locale"
   */
  localeQueryParam?: string;
}
