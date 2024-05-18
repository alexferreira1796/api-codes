import { Request, Response } from "express";

import { CodeService } from "@services/code.service";

export class CodeController {
  private codeService: CodeService;

  constructor() {
    this.codeService = new CodeService();
  }

  async generateCode(req: Request, res: Response): Promise<void> {
    const codes = await this.codeService.generateCode();
    res.json(codes);
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
      title: "[Shunyu Logistics] - Recebido pela transportadora",
      description:
        "Notificação da transportadora: Sucesso de desembaraço de exportação",
    });
    res.json(codes);
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
      title: "CRIADO",
      description:
        "O pedido foi criado com sucesso. Aguarde os demais status de rastreamento",
    });
    res.json(codes);
  }

  async getByCode(req: Request, res: Response): Promise<void> {
    const code = req.params.code ?? "";
    const codeResult = await this.codeService.getByCode(code);
    if (codeResult) {
      res.json(codeResult);
    } else {
      res.status(404).send("Code not found");
    }
  }

  async getAllCodes(req: Request, res: Response): Promise<void> {
    const codes = await this.codeService.getAllCodes();
    res.json(codes);
  }
}
