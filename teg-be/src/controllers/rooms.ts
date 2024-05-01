import { Request, Response } from "express";
import * as mysql from "./../services/mysql";

export async function list(req: Request, res: Response): Promise<void> {
  res.json(await mysql.query("SELECT * FROM `games`;"));
}

export async function getById(req: Request, res: Response): Promise<void> {
    res.json(await mysql.query("SELECT * FROM `games` WHERE `id`;"));
}

export function newRoom(req: Request, res: Response): void {
    console.log("Función 1");
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