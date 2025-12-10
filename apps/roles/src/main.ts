import { NestFactory } from '@nestjs/core';
import { RolesModule } from './roles.module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(RolesModule);
  const configService = app.get(ConfigService)
  const port = configService.get<string>('HTTP_PORT')
  if (!port){
    throw new Error('failed to load Port from .env')
  }
  await app.listen(port);
}
bootstrap();
