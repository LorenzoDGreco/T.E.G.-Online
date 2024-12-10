import { Request, Response } from "express";
import * as mysql from "./../services/mysql";
import * as functions from "./../services/functions";

export async function actual(req: Request, res: Response): Promise<void> {
  var user = await functions.getUser(req, res);
  if (user) res.json(user);
}

export async function setName(req: Request, res: Response): Promise<void> {
  if (functions.validateRaw(res, req.body, ["name"])) return;

  var insert = await mysql.query(
    "INSERT INTO users (name, token, lastUpdate) VALUES (?, ?, ?)",
    [req.body.name, _generateToken(), Date.now()]
  );

  res.json(
    await mysql.query("SELECT * FROM users WHERE id = ?", [insert.insertId])
  );
}

function _generateToken(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let token = "";
  for (let i = 0; i < 50; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return token;
}
