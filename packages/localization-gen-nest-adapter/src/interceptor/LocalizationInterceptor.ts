import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from "@nestjs/common";
import { Observable, type Subscriber } from "rxjs";
import { LocalizationService } from "../service/LocalizationService.js";
import { LOCALIZATION_OPTIONS_TOKEN } from "../constants.js";
import type { LocalizationModuleOptions } from "../types.js";

/**
 * HTTP interceptor that detects the active locale from the incoming request
 * and binds it to the async context so that `LocalizationService.getCurrentLocale()`
 * returns the correct value for the duration of the request.
 *
 * **Locale detection order:**
 * 1. Custom header (`options.localeHeader`, e.g. `x-locale`)
 * 2. Query parameter (`options.localeQueryParam`, default `locale`)
 * 3. First tag of the `Accept-Language` header
 * 4. Manifest `base_locale` fallback
 *
 * Only locales defined in `manifest.locales` are accepted.
 *
 * @example
 * // Apply globally
 * app.useGlobalInterceptors(new LocalizationInterceptor(localizationService, {}));
 *
 * // Or per controller / handler
 * @UseInterceptors(LocalizationInterceptor)
 * export class AppController {}
 */
@Injectable()
export class LocalizationInterceptor implements NestInterceptor {
  constructor(
    private readonly localizationService: LocalizationService,
    @Inject(LOCALIZATION_OPTIONS_TOKEN) private readonly options: LocalizationModuleOptions
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Record<string, unknown>>();
    const locale = this.detectLocale(request);

    return new Observable((subscriber: Subscriber<unknown>) => {
      this.localizationService.runWithLocale(locale, () => {
        next.handle().subscribe(subscriber);
      });
    });
  }

  private detectLocale(request: Record<string, unknown>): string {
    const { locales, base_locale } = this.localizationService.getManifest();
    const headers = (request["headers"] ?? {}) as Record<string, string | undefined>;
    const query = (request["query"] ?? {}) as Record<string, string | undefined>;

    const candidates: (string | undefined)[] = [
      // 1. Custom header
      this.options.localeHeader ? headers[this.options.localeHeader.toLowerCase()] : undefined,
      // 2. Query param
      query[this.options.localeQueryParam ?? "locale"],
      // 3. Accept-Language first tag
      headers["accept-language"]?.split(",")[0]?.split(";")[0]?.trim()
    ];

    for (const candidate of candidates) {
      if (candidate && locales.includes(candidate)) {
        return candidate;
      }
    }

    return base_locale;
  }
}
