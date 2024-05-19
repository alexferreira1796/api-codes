import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "Token não encontrado" });
  }

  jwt.verify(token, secretKey, (err, decoded: { role: string }) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  });
};

export default authenticateToken;
