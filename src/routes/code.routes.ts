import { Router } from "express";
import { CodeController } from "@controllers/code.controller";

const router = Router();
const codeController = new CodeController();

router.get("/codes", (req, res) => codeController.getAllCodes(req, res));

router.get("/codes/:code", (req, res) => codeController.getByCode(req, res));

router.post("/codes/international/:quantity", (req, res) =>
  codeController.generateInternationalCodes(req, res)
);
router.post("/codes/national/:quantity", (req, res) =>
  codeController.generateNationalCodes(req, res)
);

export default router;
