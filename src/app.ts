import express from "express";
import codeRoutes from "./routes/code.routes";

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.use("/api", codeRoutes);

export default app;
