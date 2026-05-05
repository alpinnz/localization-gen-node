import { Injectable } from "@nestjs/common";
import { LocalizationService } from "localization-gen-nest-adapter";

export interface UserDto {
  name: string;
  lastName: string;
  gender: "male" | "female" | "other";
  role: "admin" | "user" | "guest";
}

export interface ItemsResultDto {
  items: string[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Application service that uses `LocalizationService` for translated responses.
 *
 * Because `LocalizationInterceptor` is applied globally, every method called
 * during an HTTP request automatically uses the locale detected from headers /
 * query params – no locale parameter needed.
 */
@Injectable()
export class AppService {
  constructor(private readonly l10n: LocalizationService) {}

  /** Simple greeting in the current request locale. */
  getHello(): { message: string; locale: string; appName: string } {
    return {
      locale: this.l10n.getCurrentLocale(),
      appName: this.l10n.translate("common.app_name"),
      message: this.l10n.translate("common.greeting")
    };
  }

  /** Personalised welcome message with placeholder interpolation. */
  getWelcome(name: string): { message: string; farewell: string } {
    return {
      message: this.l10n.format("common.welcome_user", { name }),
      farewell: this.l10n.translate("common.farewell")
    };
  }

  /** Returns structured plural / gender / context translations for a user. */
  getUserInfo(user: UserDto): Record<string, string> {
    return {
      locale: this.l10n.getCurrentLocale(),
      title: this.l10n.gender("api.user_title", user.gender, { last_name: user.lastName }),
      role: this.l10n.context("api.user_role", user.role),
      welcome: this.l10n.format("common.welcome_user", { name: user.name })
    };
  }

  /** Returns API status messages for the current locale. */
  getStatuses(): Record<string, string> {
    const api = this.l10n.namespace("api");
    return {
      locale: this.l10n.getCurrentLocale(),
      ok: api.translate("status_ok"),
      created: api.translate("status_created"),
      not_found: api.translate("status_not_found"),
      unauthorized: api.translate("status_unauthorized"),
      forbidden: api.translate("status_forbidden"),
      error: api.translate("status_error")
    };
  }

  /** Returns plural forms for item counts. */
  getItemsResult(result: ItemsResultDto): Record<string, string> {
    const api = this.l10n.namespace("api");
    return {
      locale: this.l10n.getCurrentLocale(),
      summary: api.plural("items_count", result.total),
      paginator: api.format("paginator", { page: result.page, total: result.totalPages }),
      items: result.items.join(", ")
    };
  }

  /** Returns all translation entries for a locale. */
  getAllEntries(locale?: string): [string, string][] {
    return this.l10n.entriesForLocale(locale);
  }

  /** Returns the list of supported locales. */
  getLocales(): { locales: string[]; base: string; fallback: string } {
    const { locales, base_locale, fallback_locale } = this.l10n.getManifest();
    return { locales, base: base_locale, fallback: fallback_locale };
  }
}

