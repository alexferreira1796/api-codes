import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";
import "./schedules";

import app from "./app";

AppDataSource.initialize()
  .then(async () => {
    console.log("Banco de dados inicializado com sucesso!");

    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) =>
    console.log("Erro ao inicializar o banco de dados:", error)
  );
