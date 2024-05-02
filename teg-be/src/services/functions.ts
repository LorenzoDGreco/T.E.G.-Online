import { Request, Response } from "express";

import * as mysql from "./../services/mysql";

export function validateRaw(
  res: Response,
  data: object,
  parameters: string[]
): boolean {
  var keys = Object.keys(data);
  for (const param of parameters) {
    if (!keys.includes(param)) {
      res.json({ error: `${param} error`, code: 400 });
      return true;
    }
  }
  return false;
}

export function getUser(req: Request, res: Response): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      resolve(
        await mysql.query("SELECT * FROM users WHERE token = ?", [token])
      );
    } else {
      res.json({ error: `Error de cuenta`, code: 401 });
      resolve(null);
    }
  });
}
