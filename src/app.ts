import express from "express";
import codeRoutes from "./routes/code.routes";
import historyRoutes from "./routes/history.routes";

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.use("/api", codeRoutes);
app.use("/api", historyRoutes);

export default app;
