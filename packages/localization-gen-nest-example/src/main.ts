import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { LocalizationInterceptor } from "localization-gen-nest-adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply localization interceptor globally so every request gets its locale
  // detected from Accept-Language header or ?locale= query param.
  const interceptor = app.get(LocalizationInterceptor);
  app.useGlobalInterceptors(interceptor);

  await app.listen(3000);
  console.log("🚀 NestJS Localization Demo running on http://localhost:3000");
  console.log("Try: curl http://localhost:3000/localization/hello -H 'Accept-Language: id'");
}

bootstrap();

