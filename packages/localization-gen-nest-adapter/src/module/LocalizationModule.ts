import { Module, DynamicModule } from "@nestjs/common";
import type { RuntimeManifest } from "localization-gen-core";
import { LOCALIZATION_MANIFEST_TOKEN, LOCALIZATION_OPTIONS_TOKEN } from "../constants.js";
import type { LocalizationModuleOptions } from "../types.js";
import { LocalizationService } from "../service/LocalizationService.js";
import { LocalizationInterceptor } from "../interceptor/LocalizationInterceptor.js";

/**
 * NestJS module that wires up `LocalizationService` and `LocalizationInterceptor`.
 *
 * @example
 * // app.module.ts
 * import appManifest from "./assets/localizations/app-localization";
 *
 * @Module({
 *   imports: [
 *     LocalizationModule.forRoot(appManifest, { isGlobal: true }),
 *   ],
 * })
 * export class AppModule {}
 */
@Module({})
export class LocalizationModule {
  /**
   * Registers the localization module with a static manifest.
   *
   * @param manifest Generated runtime manifest from `localization-gen`.
   * @param options  Configuration options.
   */
  static forRoot(
    manifest: RuntimeManifest,
    options: LocalizationModuleOptions = {}
  ): DynamicModule {
    const manifestProvider = {
      provide: LOCALIZATION_MANIFEST_TOKEN,
      useValue: manifest
    };

    const optionsProvider = {
      provide: LOCALIZATION_OPTIONS_TOKEN,
      useValue: options
    };

    return {
      module: LocalizationModule,
      global: options.isGlobal ?? false,
      providers: [manifestProvider, optionsProvider, LocalizationService, LocalizationInterceptor],
      exports: [LocalizationService, LocalizationInterceptor]
    };
  }
}

