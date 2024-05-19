import { AppDataSource } from "../data-source";
import { Code } from "db/entities/code";
import { CodeHistory } from "db/entities/codeHistory";
import { codeGenerator, CodeGeneratorType } from "@utils/codeGenerator";
import { messages, Messages } from "@config/messages";

type Status = "SEND" | "COMPLETED";
interface IGenerateCodes {
  quantity: number;
  type: CodeGeneratorType;
  status: Status;
}

export class CodeService {
  private codeRepository = AppDataSource.getRepository(Code);
  private historyRepository = AppDataSource.getRepository(CodeHistory);

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
    const savedCode = await this.codeRepository.save(code);

    const initialMessage = messages.BR.find((msg) => msg.step === 1);
    if (initialMessage) {
      const history = this.historyRepository.create({
        code: savedCode,
        title: initialMessage.title,
        description: initialMessage.description,
        step: 1,
      });
      await this.historyRepository.save(history);
    }

    return savedCode;
  }

  async generateCodes({
    quantity,
    type,
    status,
  }: IGenerateCodes): Promise<Code[]> {
    const codes: Code[] = [];

    for (let i = 0; i < quantity; i++) {
      const newCode = await this.generateUniqueCode(type);
      const code = this.codeRepository.create({
        type,
        status,
        value: newCode,
      });
      const savedCode = await this.codeRepository.save(code);

      const initialMessage = messages[type].find((msg) => msg.step === 1);
      if (initialMessage) {
        const history = this.historyRepository.create({
          code: savedCode,
          title: initialMessage.title,
          description: initialMessage.description,
          step: 1,
        });
        await this.historyRepository.save(history);
      }

      codes.push(savedCode);
    }

    return codes;
  }

  async getCode(id: string): Promise<Code | null> {
    return await this.codeRepository.findOne({
      where: { id },
      relations: ["history"],
    });
  }

  async getByCode(value: string): Promise<Code | null> {
    return await this.codeRepository.findOne({
      where: { value },
      relations: ["history"],
    });
  }

  async getAllCodes(): Promise<Code[]> {
    return await this.codeRepository.find({
      relations: ["history"],
      order: {
        createdAt: "DESC",
      },
    });
  }

  async updateCodeStatus(id: string, status: Status): Promise<void> {
    this.codeRepository.update(id, { status });
  }

  async updateMessages(): Promise<void> {
    const codes = await this.codeRepository.find({
      where: { status: "SEND" },
      relations: ["history"],
    });

    if (codes.length <= 0) return;

    for (const code of codes) {
      const lastHistory = code.history.sort((a, b) => a.step - b.step).pop();

      let nextStep = 1;
      if (lastHistory) {
        nextStep = lastHistory.step + 1;
      }

      let message: Messages | null = null;
      if (code.type === "BR") {
        message = messages.BR.find((msg) => msg.step === nextStep);
      } else {
        message = messages.INT.find((msg) => msg.step === nextStep);
      }

      if (message) {
        const history = this.historyRepository.create({
          code: code,
          title: message.title,
          description: message.description,
          step: nextStep,
        });

        await this.historyRepository.save(history);

        if (nextStep === messages.BR.length) {
          code.status = "COMPLETED";
          await this.codeRepository.update(code.id, { status: "COMPLETED" });
        }
      }
    }
  }
}

export default CodeService;
