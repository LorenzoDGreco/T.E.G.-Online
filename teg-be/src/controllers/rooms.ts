import { Request, Response } from "express";

import * as mysql from "./../services/mysql";
import * as functions from "./../services/functions";

export async function list(req: Request, res: Response): Promise<void> {
  var user = await functions.getUser(req, res);
  if (!user) return;

  res.json(await mysql.query("SELECT * FROM rooms"));
}

export async function getById(req: Request, res: Response): Promise<void> {
  var user = await functions.getUser(req, res);
  if (!user) return;

  res.json(
    await mysql.query("SELECT * FROM rooms WHERE id = ?", [req.params.id])
  );
}

export async function newRoom(req: Request, res: Response): Promise<void> {
  if (functions.validateRaw(res, req.body, ["name", "password"])) return;

  var user = await functions.getUser(req, res);
  if (!user) return;

  var roomInsert = await mysql.query(
    `INSERT INTO rooms 
  (leaderUserId, turn, phase, status, name, password, config, war)
   VALUES (?, 0, 0, 0, ?, ?, '{}', 'NULL')`,
    [user.id, req.body.name, req.body.password]
  );

  var color = Math.floor(Math.random() * 6);
  
  await mysql.query(
    `INSERT INTO usersrooms (roomId, userId, color) VALUES (?, ?, ?)`
    [roomInsert.insertId, user.id, color]
  );

  // todo: hacer un funcion reutilizable que obtenga toda la sala
  res.json({});
}

export function history(req: Request, res: Response): void {
  console.log("Funcion 1");
}

export function settings(req: Request, res: Response): void {
  console.log("Funcion 1");
}

export function color(req: Request, res: Response): void {
  console.log("Funcion 1");
}

export function leave(req: Request, res: Response): void {
  console.log("Funcion 1");
}

export function start(req: Request, res: Response): void {
  console.log("Funcion 1");
}
