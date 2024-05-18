import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTableCode1716065775264 implements MigrationInterface {
    name = 'ChangeTableCode1716065775264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code" DROP CONSTRAINT "PK_367e70f79a9106b8e802e1a9825"`);
        await queryRunner.query(`ALTER TABLE "code" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "code" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "code" ADD CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "code" DROP CONSTRAINT "PK_367e70f79a9106b8e802e1a9825"`);
        await queryRunner.query(`ALTER TABLE "code" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "code" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "code" ADD CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id")`);
    }

}
