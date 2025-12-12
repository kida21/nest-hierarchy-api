import { ConfigService } from "@nestjs/config";
import { Role } from "apps/roles/entities/role.entity";
import { DataSource } from "typeorm";

const configService = new ConfigService()

export default new DataSource({
    type:'postgres',
    host:configService.get('HOST'),
    port:configService.get('PORT'),
    username:configService.get('POSTGRES_USER'),
    database:configService.get('POSTGRES_DB'),
    password:configService.get('POSTGRES_PASSWORD'),
    migrations:['../apps/roles/migration/**{.ts,.js}'],
    entities:[Role]

})