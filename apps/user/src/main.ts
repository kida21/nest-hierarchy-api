import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService)
  const port = configService.get<number>('USER_HTTP_PORT')
  if (!port){
    throw new Error('failed to load Port from .env')
  }
  await app.listen(port);
}
bootstrap();
