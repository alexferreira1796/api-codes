import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTables1716141319683 implements MigrationInterface {
    name = 'NewTables1716141319683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "code_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "step" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "codeId" uuid, CONSTRAINT "PK_10cc61763a5e1c72f005bb2ef17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'BR', "status" character varying NOT NULL DEFAULT 'send', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "code_history" ADD CONSTRAINT "FK_3aeee71331e2e219111ff3386bb" FOREIGN KEY ("codeId") REFERENCES "code"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code_history" DROP CONSTRAINT "FK_3aeee71331e2e219111ff3386bb"`);
        await queryRunner.query(`DROP TABLE "code"`);
        await queryRunner.query(`DROP TABLE "code_history"`);
    }

}
