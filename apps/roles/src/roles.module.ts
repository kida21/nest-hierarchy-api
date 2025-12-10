import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Role } from 'apps/entities/role.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService : ConfigService) => ({
        type:'postgres',
        host:configService.get<string>('HOST'),
        port:configService.get<number>('PORT'),
        database:configService.get<string>('DATABASE'),
        username:configService.get<string>('USERNAME'),
        password:configService.get<string>('PASSWORD'),
        entities:[Role],
        synchronize:true
        
      }),
      inject:[ConfigService]
    })
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
