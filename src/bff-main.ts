import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { BffAppModule } from "./main/modules/bff-app.module";

async function bootstrap() {
  const app = await NestFactory.create(BffAppModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
