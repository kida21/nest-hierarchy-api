import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migration1765521534423 implements MigrationInterface {

  private readonly tableName = "role";
  private readonly fkName = "FK_role_parent";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS citext`);
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "citext",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "parentId",
            type: "uuid",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: this.fkName,
        columnNames: ["parentId"],
        referencedTableName: this.tableName,
        referencedColumnNames: ["id"],
        onDelete: "CASCADE", 
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, this.fkName);
    await queryRunner.dropTable(this.tableName);
  }
}
