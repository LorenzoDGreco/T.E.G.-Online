import { configModel } from "./configModel";
import { warModel } from "./warModel";

export class roomModel {
    id: number = 0;
	leaderUserId: number = 0;
	turn: number = 0;
	phase: number = 0;
	status: number = 0;
	name: string = "";
	password: string = "";
	war: warModel = new warModel();
	config: configModel = new configModel();
	lastUpdate: number = 0;
}