import { NestFactory } from '@nestjs/core';
import { RolesModule } from './roles.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(RolesModule);
  const configService = app.get(ConfigService)
  const port = configService.get<string>('HTTP_PORT')
  if (!port){
    throw new Error('failed to load Port from .env')
  }
  const config = new DocumentBuilder()
    .setTitle('Role Management Api')
    .setDescription('Api for managing Rolea')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
