import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Controller parameter decorator that extracts the active locale
 * attached to the request by `LocalizationInterceptor`.
 *
 * Falls back to the `Accept-Language` header first tag if the interceptor
 * has not run (e.g. WebSocket contexts).
 *
 * @example
 * @Get("hello")
 * hello(@RequestLocale() locale: string) {
 *   return this.localizationService.translate("common.greeting", undefined, locale);
 * }
 */
export const RequestLocale = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Record<string, unknown>>();
    // Set by LocalizationInterceptor when it runs before the handler.
    if (typeof request["activeLocale"] === "string") {
      return request["activeLocale"];
    }
    // Fallback: read Accept-Language header directly.
    const headers = (request["headers"] ?? {}) as Record<string, string | undefined>;
    return headers["accept-language"]?.split(",")[0]?.split(";")[0]?.trim() ?? "en";
  }
);
