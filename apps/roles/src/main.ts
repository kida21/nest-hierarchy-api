import { NestFactory } from '@nestjs/core';
import { RolesModule } from './roles.module';

async function bootstrap() {
  const app = await NestFactory.create(RolesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
