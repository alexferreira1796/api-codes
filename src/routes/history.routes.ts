import { Router } from "express";
import HistoryController from "@controllers/history.controller";

const router = Router();
const historyController = new HistoryController();

router.get("/history", (req, res) => historyController.getAllHistory(req, res));

router.get("/history/:id", (req, res) =>
  historyController.getHistoryById(req, res)
);

export default router;
