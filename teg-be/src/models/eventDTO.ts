import { GameModel } from "./gameModel";

export interface EventDTO {
    name: string;
    user_id: number;
    type: number;
    params: Record<string, any>;
    private: number;
    gameData: GameModel;
}
