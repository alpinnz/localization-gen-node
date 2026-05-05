import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service.js";

/**
 * Example REST controller demonstrating localization-gen-nest-adapter.
 *
 * All endpoints respect the locale detected by LocalizationInterceptor:
 *   - Pass `?locale=id`  (query param)
 *   - Or set  `Accept-Language: id`  header
 *
 * curl examples:
 *   curl http://localhost:3000/localization/hello
 *   curl http://localhost:3000/localization/hello?locale=id
 *   curl http://localhost:3000/localization/hello -H "Accept-Language: id"
 */
@Controller("localization")
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET /localization/hello
   * Simple greeting in the detected locale.
   */
  @Get("hello")
  getHello() {
    return this.appService.getHello();
  }

  /**
   * GET /localization/welcome?name=Alfin
   * Personalised welcome using placeholder interpolation.
   */
  @Get("welcome")
  getWelcome(@Query("name") name = "World") {
    return this.appService.getWelcome(name);
  }

  /**
   * GET /localization/user?name=Alfin&lastName=Doe&gender=male&role=admin
   * Shows gender / context structured translations.
   */
  @Get("user")
  getUserInfo(
    @Query("name") name = "Alfin",
    @Query("lastName") lastName = "Doe",
    @Query("gender") gender: "male" | "female" | "other" = "male",
    @Query("role") role: "admin" | "user" | "guest" = "user"
  ) {
    return this.appService.getUserInfo({ name, lastName, gender, role });
  }

  /**
   * GET /localization/items?total=5&page=1&totalPages=3
   * Shows plural structured translations.
   */
  @Get("items")
  getItems(
    @Query("total") total = "5",
    @Query("page") page = "1",
    @Query("totalPages") totalPages = "3"
  ) {
    return this.appService.getItemsResult({
      items: ["Item A", "Item B", "Item C"],
      total: Number(total),
      page: Number(page),
      totalPages: Number(totalPages)
    });
  }

  /**
   * GET /localization/statuses
   * Returns all API status messages in the detected locale.
   */
  @Get("statuses")
  getStatuses() {
    return this.appService.getStatuses();
  }

  /**
   * GET /localization/locales
   * Returns metadata about available locales.
   */
  @Get("locales")
  getLocales() {
    return this.appService.getLocales();
  }

  /**
   * GET /localization/entries?locale=id
   * Returns all key-value pairs for a locale (can override via query param).
   */
  @Get("entries")
  getEntries(@Query("locale") locale?: string) {
    const entries = this.appService.getAllEntries(locale);
    return {
      locale: locale ?? "default",
      count: entries.length,
      entries: Object.fromEntries(entries)
    };
  }
}

