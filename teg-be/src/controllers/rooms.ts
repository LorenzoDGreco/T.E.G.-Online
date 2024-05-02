import { Request, Response } from "express";

import * as mysql from "./../services/mysql";
import * as functions from "./../services/functions";

export async function list(req: Request, res: Response): Promise<void> {
  var user = await functions.getUser(req, res);
  if (!user) return;

  res.json(await mysql.query("SELECT * FROM games"));
}

export async function getById(req: Request, res: Response): Promise<void> {
  var user = await functions.getUser(req, res);
  if (!user) return;

  res.json(
    await mysql.query("SELECT * FROM games WHERE id = ?", [req.params.id])
  );
}

export async function newRoom(req: Request, res: Response): Promise<void> {
  await mysql.query("");
  res.json({});
}

export function history(req: Request, res: Response): void {
  console.log("Función 1");
}

export function settings(req: Request, res: Response): void {
  console.log("Función 1");
}

export function color(req: Request, res: Response): void {
  console.log("Función 1");
}

export function start(req: Request, res: Response): void {
  console.log("Función 1");
}
