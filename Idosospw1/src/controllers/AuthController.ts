
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {
  static login(req: Request, res: Response) {
    const { email } = req.body;
    const token = jwt.sign({ email }, "secret", { expiresIn: "1d" });
    return res.json({ token });
  }
}
