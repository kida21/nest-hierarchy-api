import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
       inject: [ConfigService],
       useFactory:(configService:ConfigService)=>({
        type:'postgres',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        database: configService.get<string>('POSTGRES_DB'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        entities: [User],
        synchronize: false,
       })
    }),
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
