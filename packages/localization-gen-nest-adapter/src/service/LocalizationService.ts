import { Injectable, Inject } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import {
  interpolate,
  lookupMessage,
  pickStructuredContextVariant,
  pickStructuredGenderVariant,
  pickStructuredPluralVariant
} from "localization-gen-core/runtime";
import type { RuntimeManifest } from "localization-gen-core";
import { LOCALIZATION_MANIFEST_TOKEN, LOCALIZATION_OPTIONS_TOKEN } from "../constants.js";
import type { LocalizationModuleOptions } from "../types.js";

export type InterpolationParams = Record<string, string | number>;
export type GenderVariant = "male" | "female" | "other";

export interface NamespacedLocalizer {
  /** Resolves plain string key in current namespace. */
  translate(key: string, fallbackValue?: string): string;
  /** Resolves and interpolates placeholder key in current namespace. */
  format(key: string, params: InterpolationParams): string;
  /** Resolves structured plural key in current namespace. */
  plural(key: string, count: number): string;
  /** Resolves structured gender key in current namespace. */
  gender(key: string, genderValue: GenderVariant, params: InterpolationParams): string;
  /** Resolves structured context key in current namespace. */
  context(key: string, contextValue: string, params?: InterpolationParams): string;
}

/**
 * Per-request locale context stored via `AsyncLocalStorage`.
 * Allows the service to remain a singleton while still being
 * request-aware when used together with `LocalizationInterceptor`.
 */
const localeStorage = new AsyncLocalStorage<{ locale: string }>();

/**
 * Core NestJS service for runtime localization.
 *
 * - Inject it as a **singleton** – no need for request scope.
 * - Use `LocalizationInterceptor` to automatically bind the
 *   `Accept-Language` / query-param locale for each HTTP request.
 * - Call `runWithLocale(locale, fn)` manually when you need an
 *   explicit locale context outside of an HTTP request (e.g. jobs).
 */
@Injectable()
export class LocalizationService {
  constructor(
    @Inject(LOCALIZATION_MANIFEST_TOKEN) private readonly manifest: RuntimeManifest,
    @Inject(LOCALIZATION_OPTIONS_TOKEN) private readonly options: LocalizationModuleOptions
  ) {}

  // ─── Manifest access ────────────────────────────────────────────────────────

  /** Returns the full runtime manifest. */
  getManifest(): RuntimeManifest {
    return this.manifest;
  }

  // ─── Locale resolution ──────────────────────────────────────────────────────

  /**
   * Returns the locale bound to the current async context (set by
   * `LocalizationInterceptor`) or falls back to `manifest.base_locale`.
   */
  getCurrentLocale(): string {
    return localeStorage.getStore()?.locale ?? this.manifest.base_locale;
  }

  /**
   * Executes `fn` within an async context where `getCurrentLocale()` returns
   * the given `locale`.  Used internally by `LocalizationInterceptor` and
   * useful for background jobs or tests.
   *
   * @example
   * const result = localizationService.runWithLocale("id", () =>
   *   localizationService.translate("common.greeting")
   * );
   */
  runWithLocale<T>(locale: string, fn: () => T): T {
    return localeStorage.run({ locale }, fn);
  }

  // ─── Core translation helpers ────────────────────────────────────────────────

  /** Reads the raw stored value (plain or JSON-encoded structured variants). */
  raw(key: string, locale?: string): string {
    const loc = locale ?? this.getCurrentLocale();
    return (
      this.manifest.messages[loc]?.[key] ??
      this.manifest.messages[this.manifest.fallback_locale]?.[key] ??
      ""
    );
  }

  /**
   * Resolves a translation key.
   *
   * @param key Fully qualified key (e.g. `"common.greeting"`).
   * @param fallbackValue Value to return when the key is missing.
   * @param locale Override locale; defaults to `getCurrentLocale()`.
   */
  translate(key: string, fallbackValue?: string, locale?: string): string {
    const loc = locale ?? this.getCurrentLocale();
    const value = lookupMessage(
      {
        locale: loc,
        fallbackLocale: this.manifest.fallback_locale,
        messages: this.manifest.messages
      },
      key
    );
    if (!value || value === key) {
      return fallbackValue ?? value;
    }
    return value;
  }

  /**
   * Resolves a translation key and interpolates `params` into placeholders.
   *
   * @example
   * service.format("common.welcome_user", { name: "Alfin" })
   * // → "Welcome, Alfin!"
   */
  format(key: string, params: InterpolationParams, locale?: string): string {
    return interpolate(this.translate(key, undefined, locale), params);
  }

  /**
   * Resolves a `@plural` structured key based on `count`.
   *
   * @example
   * service.plural("api.items_count", 0)  // → "No items found"
   * service.plural("api.items_count", 1)  // → "1 item found"
   * service.plural("api.items_count", 5)  // → "{count} items found"
   */
  plural(key: string, count: number, locale?: string): string {
    return pickStructuredPluralVariant(this.raw(key, locale), count);
  }

  /**
   * Resolves a `@gender` structured key and interpolates `params`.
   *
   * @example
   * service.gender("common.user_title", "female", { last_name: "Smith" })
   */
  gender(
    key: string,
    genderValue: GenderVariant,
    params: InterpolationParams,
    locale?: string
  ): string {
    return interpolate(pickStructuredGenderVariant(this.raw(key, locale), genderValue), params);
  }

  /**
   * Resolves a `@context` structured key and optionally interpolates `params`.
   *
   * @example
   * service.context("api.user_role", "admin") // → "Administrator"
   */
  context(
    key: string,
    contextValue: string,
    params?: InterpolationParams,
    locale?: string
  ): string {
    const value = pickStructuredContextVariant(this.raw(key, locale), contextValue);
    return params ? interpolate(value, params) : value;
  }

  /**
   * Returns a scoped helper that prefixes every key with `scope`.
   *
   * @example
   * const api = service.namespace("api");
   * api.translate("status_ok"); // same as service.translate("api.status_ok")
   */
  namespace(scope: string, locale?: string): NamespacedLocalizer {
    return {
      translate: (key, fallback) => this.translate(`${scope}.${key}`, fallback, locale),
      format: (key, params) => this.format(`${scope}.${key}`, params, locale),
      plural: (key, count) => this.plural(`${scope}.${key}`, count, locale),
      gender: (key, genderValue, params) =>
        this.gender(`${scope}.${key}`, genderValue, params, locale),
      context: (key, contextValue, params) =>
        this.context(`${scope}.${key}`, contextValue, params, locale)
    };
  }

  /**
   * Returns all `[key, value]` pairs for the given (or current) locale,
   * sorted alphabetically by key.
   */
  entriesForLocale(locale?: string): [string, string][] {
    const loc = locale ?? this.getCurrentLocale();
    return Object.entries(this.manifest.messages[loc] ?? {}).sort(([a], [b]) =>
      a.localeCompare(b)
    ) as [string, string][];
  }
}

