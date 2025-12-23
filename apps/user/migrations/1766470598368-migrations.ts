import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrations1766470598368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'user',
                columns:[
                    {
                     name: "id",
                     type: "uuid",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "uuid",
                     default: "uuid_generate_v4()"
                    },
                    {
                       name: "email",
                      type: "varchar",
                      isNullable: false,
                      isUnique:true
                    },
                    {
                      name: "password",
                      type: "varchar",
                       isNullable: false
                    },
                    {
                      name: "role",
                      type: "varchar",
                      isNullable: false,
                      default:'admin'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}
