import { Request, Response } from "express";

import { HistoryService } from "@services/history.service";

export class HistoryController {
  private historyService: HistoryService;

  constructor() {
    this.historyService = new HistoryService();
  }

  async getAllHistory(_: Request, res: Response): Promise<void> {
    const historyResult = await this.historyService.getAllHistory();
    res.status(200).json(historyResult);
  }

  async getHistoryById(req: Request, res: Response): Promise<void> {
    const id = req.params.id ?? "";
    const historyResult = await this.historyService.getHistoryById(id);
    if (historyResult) {
      res.status(200).json(historyResult);
    } else {
      res.status(404).send("History not found");
    }
  }

  async updateHistoryCode(): Promise<void> {
    return this.historyService.updateHistory();
  }
}

export default HistoryController;
