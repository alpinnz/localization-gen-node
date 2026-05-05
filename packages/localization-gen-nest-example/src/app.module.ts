import { Module } from "@nestjs/common";
import { LocalizationModule } from "localization-gen-nest-adapter";
import appLocalizationManifest from "./assets/localizations/app-localization.js";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";

@Module({
  imports: [
    /**
     * Register the localization module globally so LocalizationService
     * is available in every feature module without re-importing.
     */
    LocalizationModule.forRoot(appLocalizationManifest, {
      isGlobal: true,
      localeQueryParam: "locale"
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

