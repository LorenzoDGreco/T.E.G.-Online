import { Request, Response } from "express";
import * as url from 'url';

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

  const parsedUrl = url.parse(req.url!, true);
  const params = parsedUrl.query;

  var update = -1;
  if (typeof(params.update) == 'string') update = parseInt(params.update)

  res.json(await functions.getChanges(req, res, update, parseInt(req.params.id)))
}

export async function newRoom(req: Request, res: Response): Promise<void> {
  if (functions.validateRaw(res, req.body, ["name", "password"])) return;

  var user = await functions.getUser(req, res);
  if (!user) return;

  var roomInsert = await mysql.query(
    `INSERT INTO rooms 
  (leaderUserId, turn, phase, status, name, password, config, war, lastUpdate, globalUpdate)
   VALUES (?, 0, 0, 0, ?, ?, '{}', '{}', ?, ?)`,
    [user.id, req.body.name, req.body.password, Date.now(), Date.now()]
  );

  var color = Math.floor(Math.random() * 6);

  await mysql.query(
    `INSERT INTO roomusers (roomId, userId, color, lastUpdate) VALUES (?, ?, ?, ?)`,
    [roomInsert.insertId, user.id, color, Date.now()]
  );

  //todo: Devuelve vacio, no se si es porque al crear es la ultima actualizacion o si esta fallando algo
  res.json(functions.getChanges(req, res, -1, roomInsert.insertId));
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
