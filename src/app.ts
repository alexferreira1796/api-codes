import express from "express";
import codeRoutes from "./routes/code.routes";
import historyRoutes from "./routes/history.routes";

import authenticateToken from "middlewares/authenticateToken";

const app = express();

app.use(express.json());

app.get("/api", (_, res) => {
  res.send("Hello World");
});

app.use("/api", authenticateToken, codeRoutes);
app.use("/api", authenticateToken, historyRoutes);

export default app;
