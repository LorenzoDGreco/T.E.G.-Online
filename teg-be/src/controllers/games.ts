import { Request, Response } from "express";
import * as mysql from './../services/mysql'

export async function funcion1(req: Request, res: Response): Promise<void> {
    console.log(await mysql.query('SELECT * FROM `teg-online`.`cards` LIMIT 1000;'));
}

export function warInit(req: Request, res: Response): void {
    console.log("Función 1");
}
export function warDices(req: Request, res: Response): void {
    console.log("Función 1");
}
export function warMove(req: Request, res: Response): void {
    console.log("Función 1");
}
export function armiesReposition(req: Request, res: Response): void {
    console.log("Función 1");
}

export function armiesPut(req: Request, res: Response): void {
    console.log("Función 1");
}

export function armiesEnd(req: Request, res: Response): void {
    console.log("Función 1");
}