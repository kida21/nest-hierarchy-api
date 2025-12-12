import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migration1765521534423 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false
          },
          {
            name: "description",
            type: "text",
            isNullable: false
          },
          {
            name: "parentId",
            type: "uuid",
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      "role",
      new TableForeignKey({
        columnNames: ["parentId"],
        referencedColumnNames: ["id"],
        referencedTableName: "role",
        onDelete: "SET NULL"
      })
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("role");
  }

}
