import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory:(configService:ConfigService) => ({
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:configService.get<number>('JWT_EXPIRE_IN')
        }
    
      }),
      inject:[ConfigService]
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
