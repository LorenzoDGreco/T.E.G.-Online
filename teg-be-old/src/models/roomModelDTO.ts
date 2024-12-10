import { configModel } from "./configModel";
import { roomModel } from "./roomModel";
import { warModel } from "./warModel";

export class roomModelDTO {
    id: number;
	leaderUserId: number;
	turn: number;
	phase: number;
	status: number;
	name: string;
	password: string;
	config: configModel;
	lastUpdate: number;

	constructor(room: roomModel) {
		this.id = room.id;
		this.leaderUserId = room.leaderUserId;
		this.turn = room.turn;
		this.phase = room.phase;
		this.status = room.status;
		this.name = room.name;
		this.password = room.password;
		this.config = room.config;
		this.lastUpdate = room.lastUpdate;
	}
}
