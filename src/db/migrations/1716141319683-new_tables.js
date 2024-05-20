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
exports.NewTables1716141319683 = void 0;
class NewTables1716141319683 {
    constructor() {
        this.name = 'NewTables1716141319683';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "code_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "step" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "codeId" uuid, CONSTRAINT "PK_10cc61763a5e1c72f005bb2ef17" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'BR', "status" character varying NOT NULL DEFAULT 'send', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_367e70f79a9106b8e802e1a9825" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "code_history" ADD CONSTRAINT "FK_3aeee71331e2e219111ff3386bb" FOREIGN KEY ("codeId") REFERENCES "code"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "code_history" DROP CONSTRAINT "FK_3aeee71331e2e219111ff3386bb"`);
            yield queryRunner.query(`DROP TABLE "code"`);
            yield queryRunner.query(`DROP TABLE "code_history"`);
        });
    }
}
exports.NewTables1716141319683 = NewTables1716141319683;
