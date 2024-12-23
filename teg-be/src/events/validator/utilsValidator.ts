import { EventDTO } from "../../models/eventDTO";
import { GameModel } from "../../models/gameModel";
import { ValidatorResponseModel } from "../../models/validatorResponseModel";

export function getPlayerIndex(eventDto: EventDTO, playerId: number = -1) {
    if (playerId == -1) playerId = eventDto.user_id;
    return eventDto.gameData.players.findIndex(
        (player) => player.id == playerId
    );
}

export function getPlayer(eventDto: EventDTO, playerId: number = -1) {
    if (playerId == -1) playerId = eventDto.user_id;
    return eventDto.gameData.players[getPlayerIndex(eventDto, playerId)];
}

export function adminValid(eventDto: EventDTO) {
    if (!getPlayer(eventDto).admin) {
        return new ValidatorResponseModel(
            eventDto.gameData,
            "Se necesita ser admin"
        );
    }
    return false;
}
