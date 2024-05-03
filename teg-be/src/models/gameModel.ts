import { countrieModel } from "./countrieModel";
import { cardModel } from "./cardModel";
import { roomModel } from "./roomModel";
import { userModel } from "./userModel";
import { warModel } from "./warModel";

export class gameModel {
  room: roomModel = new roomModel();
  users: userModel[] = [];
  countries: countrieModel[] = [];
  cards: cardModel[] = [];
  war: warModel = new warModel();
}
