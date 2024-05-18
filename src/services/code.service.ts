import { AppDataSource } from "../data-source";
import { Code } from "db/entities/code";
import { codeGenerator, CodeGeneratorType } from "@utils/codeGenerator";

interface IGenerateCodes {
  title: string;
  quantity: number;
  description: string;
  type: CodeGeneratorType;
}

export class CodeService {
  private codeRepository = AppDataSource.getRepository(Code);

  async generateUniqueCode(type: CodeGeneratorType): Promise<string> {
    let newCode: string;
    let isUnique = false;

    while (!isUnique) {
      newCode = codeGenerator(type);
      const existingCode = await this.codeRepository.findOneBy({
        value: newCode,
      });

      if (!existingCode) {
        isUnique = true;
      }
    }

    return newCode;
  }

  async generateCode(): Promise<Code> {
    const newCode = await this.generateUniqueCode("BR");
    const code = this.codeRepository.create({ value: newCode });
    return await this.codeRepository.save(code);
  }

  async generateCodes({
    title,
    quantity,
    description,
    type,
  }: IGenerateCodes): Promise<Code[]> {
    const codes: Code[] = [];

    for (let i = 0; i < quantity; i++) {
      const newCode = await this.generateUniqueCode(type);
      const code = this.codeRepository.create({
        title,
        description,
        type,
        value: newCode,
      });
      codes.push(await this.codeRepository.save(code));
    }

    return codes;
  }

  async getCode(id: string): Promise<Code | null> {
    return await this.codeRepository.findOneBy({ id });
  }

  async getByCode(value: string): Promise<Code | null> {
    return await this.codeRepository.findOneBy({ value });
  }

  async getAllCodes(): Promise<Code[]> {
    return await this.codeRepository.find();
  }

  async updateMessages(): Promise<void> {
    const codes = await this.codeRepository.find();
    codes.forEach(async (code) => {
      code.title = "TITLE";
      code.description = "DESCRIPTION";
      await this.codeRepository.save(code);
    });
  }
}

export default CodeService;
