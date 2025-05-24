import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ConsumerAppModule } from "./main/modules/consumer-app.module";

async function bootstrap() {
  const app = await NestFactory.create(ConsumerAppModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
  });
  await app.listen(3001);
}
bootstrap();
