import { countrieModel } from "./countrieModel";
import { cardModel } from "./cardModel";
import { roomModel } from "./roomModel";
import { warModel } from "./warModel";
import { roomModelDTO } from "./roomModelDTO";
import { roomuserModel } from "./roomuserModel";

export class gameModelDTO {
  room: roomModelDTO | null = null;
  war: warModel | null = null;
  users: roomuserModel[] = [];
  countries: countrieModel[] = [];
  cards: cardModel[] = [];
}
