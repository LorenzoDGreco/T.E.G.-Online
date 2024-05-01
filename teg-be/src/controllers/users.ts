import { Request, Response } from "express";

export function actual(req: Request, res: Response): void {
    console.log("Función 1");
}

export function setname(req: Request, res: Response): void {
    console.log("Función 1");
}