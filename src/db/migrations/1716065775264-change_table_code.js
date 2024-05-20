"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTableCode1716065775264 = void 0;
class ChangeTableCode1716065775264 {
    constructor() {
        this.name = 'ChangeTableCode1716065775264';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "code" DROP CONSTRAINT "PK_367e70f79a9106b8e802e1a9825"`);
            yield queryRunner.query(`ALTER TABLE "code" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "code" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "code" ADD CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "code" DROP CONSTRAINT "PK_367e70f79a9106b8e802e1a9825"`);
            yield queryRunner.query(`ALTER TABLE "code" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "code" ADD "id" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "code" ADD CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id")`);
        });
    }
}
exports.ChangeTableCode1716065775264 = ChangeTableCode1716065775264;
