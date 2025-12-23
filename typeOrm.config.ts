import { ConfigService } from "@nestjs/config";
import { Role } from "./apps/roles/entities/role.entity";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { User } from "apps/user/entities/user.entity";

config()

const configService = new ConfigService()

export default new DataSource({
    type:'postgres',
    host:configService.get('HOST'),
    port:configService.get('PORT'),
    username:configService.get('POSTGRES_USER'),
    database:configService.get('POSTGRES_DB'),
    password:configService.get('POSTGRES_PASSWORD'),
    migrations:['./apps/roles/migrations/**','./apps/user/migrations/**'],
    entities:[Role,User]

})