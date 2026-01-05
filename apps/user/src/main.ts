import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService)
  const port = configService.get<string>('USER_HTTP_PORT')
  const url = configService.get('URL')
  if (!port){
    throw new Error('Failed to load Port from .env file')
  }
  app.connectMicroservice({
    transport:Transport.TCP,
    options:{
      host:'0.0.0.0',
      port:configService.get('TCP_PORT')
    }
  })
  app.enableCors({
    origin: url, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
  });
  app.use(cookieParser())
  app.startAllMicroservices()
  await app.listen(port);
}
bootstrap();
