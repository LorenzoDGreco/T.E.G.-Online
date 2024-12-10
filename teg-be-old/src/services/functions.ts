import { Request, Response } from "express";

import * as mysql from "./../services/mysql";
import { gameModelDTO } from "../models/gameModelDTO";
import { roomModel } from "../models/roomModel";
import { roomModelDTO } from "../models/roomModelDTO";
import { roomuserModel } from "../models/roomuserModel";
import { roomuserModelDTO } from "../models/roomuserModelDTO";
import { countrieModel } from "../models/countrieModel";
import { cardModel } from "../models/cardModel";
import { userModel } from "../models/userModel";

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

export function getUser(
  req: Request,
  res: Response
): Promise<userModel | null> {
  return new Promise(async (resolve, reject) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const user = await mysql.query("SELECT * FROM users WHERE token = ? LIMIT 1", [token])
      if (user.length > 0) resolve(user[0]);
      else resolve(null);
    } else {
      res.json({ error: `Error de cuenta`, code: 401 });
      resolve(null);
    }
  });
}

export async function getChanges(
  req: Request,
  res: Response,
  update: number,
  roomId: number
): Promise<gameModelDTO> {
  return new Promise(async (resolve, reject) => {
    var user: userModel | null = await getUser(req, res);
    if (!user) return;

    const rooms: roomModel[] = await mysql.query(
      "SELECT * FROM rooms WHERE id = ? AND globalUpdate > ? LIMIT 1",
      [roomId, update]
    ); 

    var game = new gameModelDTO();

    if (rooms.length < 1) {      
      resolve(game);
      return;
    }

    if (rooms[0].lastUpdate > update) {
      game.room = new roomModelDTO(rooms[0]);
    }

    if (rooms[0].war.lastUpdate > update) game.war = rooms[0].war;
    
    const [users, cards, countries] = await Promise.all([
      getChangesUsers(user, rooms[0], update),
      getChangesCards(rooms[0], update),
      getChangesCountries(rooms[0], update),
    ]);

    game.users = users;
    game.cards = cards;
    game.countries = countries;

    resolve(game);
  });
}

async function getChangesUsers(
  user: userModel,
  room: roomModel,
  update: number
): Promise<roomuserModel[]> {
  return new Promise(async (resolve, reject) => {
    var users: roomuserModelDTO[] = await mysql.query(
      `SELECT u.name, r.* 
      FROM roomusers r
      INNER JOIN users u ON r.userId = u.id
      WHERE r.roomId = ? AND r.lastUpdate > ?`,
      [room.id, update]
    );

    if (users.length > 0) {
      for (const u of users) {
        if (u.id != user.id) u.objetive = -1;
      }
    }

    resolve(users);
  });
}

async function getChangesCards(
  room: roomModel,
  update: number
): Promise<cardModel[]> {
  return new Promise(async (resolve, reject) => {
    var cards: cardModel[] = await mysql.query(
      `SELECT * FROM cards WHERE roomId = ? AND lastUpdate > ?`,
      [room.id, update]
    );
    
    resolve(cards);
  });
}

async function getChangesCountries(
  room: roomModel,
  update: number
): Promise<countrieModel[]> {
  return new Promise(async (resolve, reject) => {
    var countries: countrieModel[] = await mysql.query(
      `SELECT * FROM countries WHERE roomId = ? AND lastUpdate > ?`,
      [room.id, update]
    );

    resolve(countries);
  });
}