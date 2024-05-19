import { AppDataSource } from "../data-source";

import { CodeHistory } from "../db/entities/codeHistory";

import { messages, Messages } from "../config/messages";

import CodeService from "./code.service";

export class HistoryService {
  private codeService: CodeService;
  private historyRepository = AppDataSource.getRepository(CodeHistory);

  constructor() {
    this.codeService = new CodeService();
  }

  async getAllHistory(): Promise<CodeHistory[]> {
    return await this.historyRepository.find({
      relations: ["code"],
      order: {
        createdAt: "DESC",
      },
    });
  }

  async getHistoryById(id: string): Promise<CodeHistory[]> {
    return await this.historyRepository.findBy({ id: id });
  }

  async updateHistory(): Promise<void> {
    const codes = await this.codeService.getAllCodes();

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
          await this.codeService.updateCodeStatus(code.id, "COMPLETED");
        }
      }
    }
  }
}

export default HistoryService;
