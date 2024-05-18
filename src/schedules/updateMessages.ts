import cron from "node-cron";
import { CodeService } from "@services/code.service";

const codeService = new CodeService();

// Schedule the task to run every 8 days
cron.schedule("0 0 */8 * *", async () => {
  console.log("Atualizando mensagens e títulos...");
  await codeService.updateMessages();
  console.log("Mensagens e títulos atualizados.");
});
// "*/10 * * * * *"
