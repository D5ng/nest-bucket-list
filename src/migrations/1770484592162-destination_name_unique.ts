import { MigrationInterface, QueryRunner } from "typeorm";

export class DestinationNameUnique1770484592162 implements MigrationInterface {
    name = 'DestinationNameUnique1770484592162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination" ADD CONSTRAINT "UQ_8a962921d15e2f4cfa8eba67482" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "destination" DROP CONSTRAINT "UQ_8a962921d15e2f4cfa8eba67482"`);
    }

}
