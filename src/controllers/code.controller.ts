import { Request, Response } from "express";

import { CodeService } from "@services/code.service";

export class CodeController {
  private codeService: CodeService;

  constructor() {
    this.codeService = new CodeService();
  }

  async generateCode(_: Request, res: Response): Promise<void> {
    const codes = await this.codeService.generateCode();
    res.status(200).json(codes);
  }

  async generateInternationalCodes(req: Request, res: Response): Promise<void> {
    const quantity = parseInt(req.params.quantity) ?? 1;

    if (isNaN(quantity) || quantity <= 0) {
      res.status(400).json({ error: "Invalid quantity parameter" });
      return;
    }

    const codes = await this.codeService.generateCodes({
      quantity,
      type: "INT",
      status: "SEND",
    });
    res.status(200).json(codes);
  }

  async generateNationalCodes(req: Request, res: Response): Promise<void> {
    const quantity = parseInt(req.params.quantity) ?? 1;

    if (isNaN(quantity) || quantity <= 0) {
      res.status(400).json({ error: "Invalid quantity parameter" });
      return;
    }

    const codes = await this.codeService.generateCodes({
      quantity,
      type: "BR",
      status: "SEND",
    });
    res.status(200).json(codes);
  }

  async getByCode(req: Request, res: Response): Promise<void> {
    const code = req.params.code ?? "";
    const codeResult = await this.codeService.getByCode(code);
    if (codeResult) {
      res.status(200).json(codeResult);
    } else {
      res.status(404).json({
        message: "Code not found",
      });
    }
  }

  async getAllCodes(_: Request, res: Response): Promise<void> {
    const codes = await this.codeService.getAllCodes();
    res.status(200).json(codes);
  }
}

export default CodeController;
