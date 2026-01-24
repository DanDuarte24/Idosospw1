
import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  return res.status(500).json({ error: err.message || "Internal error" });
}
