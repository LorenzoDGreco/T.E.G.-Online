import { GameModel } from "./gameModel";

export class ValidatorResponseModel {
    gameData: GameModel;
    status: boolean;
    error: string;

    constructor (gameData: GameModel, error = '') {
        this.gameData = gameData;
        this.error = error;
        this.status = !error;
    }
}
