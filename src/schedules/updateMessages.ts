import cron from "node-cron";
import { HistoryController } from "../controllers/history.controller";

const historyController = new HistoryController();

// Agenda a tarefa para rodar a cada 4 dias à meia-noite
cron.schedule("*/10 * * * * *", async () => {
  console.log("Atualizando mensagens e títulos...");
  await historyController.updateHistoryCode();
  console.log("Mensagens e títulos atualizados.");
});
// "*/10 * * * * *"
// 0 0 */4 * *
