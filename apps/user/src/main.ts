import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService)
  const port = configService.get<string>('USER_HTTP_PORT')
  if (!port){
    throw new Error('failed to load Port from .env')
  }
  app.connectMicroservice({
    transport:Transport.TCP,
    options:{
      host:'0.0.0.0',
      port:configService.get('TCP_PORT')
    }
  })
  
  app.startAllMicroservices()
  await app.listen(port);
}
bootstrap();
