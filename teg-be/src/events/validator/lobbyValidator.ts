import { EventDTO } from "../../models/eventDTO";
import { Player } from "../../models/gameModel";
import { ValidatorResponseModel } from "../../models/validatorResponseModel";
import * as utils from "./utilsValidator";

export async function newLobby(eventDto: EventDTO) {
    console.log("validator newLobby");
    return new ValidatorResponseModel(eventDto.gameData);
}

export async function joinLobby(eventDto: EventDTO) {
    console.log("validator joinLobby");
    if (eventDto.gameData.status != 0) {
        return new ValidatorResponseModel(
            eventDto.gameData,
            "La partida esta en juego o finalizada"
        );
    }
    var player: Player = new Player();
    player.id = eventDto.user_id;
    player.name = eventDto.params.name;
    if (!eventDto.gameData.players.length) player.admin = true;
    eventDto.gameData.players.push(player);
    return new ValidatorResponseModel(eventDto.gameData);
}

export async function changeConfigLobby(eventDto: EventDTO) {
    console.log("validator changeConfigLobby");
    if (utils.adminValid(eventDto)) return utils.adminValid(eventDto);
    eventDto.gameData.game.config = eventDto.params.config;
    eventDto.gameData.game.name = eventDto.params.name;
    return new ValidatorResponseModel(eventDto.gameData);
}

export async function changeColorLobby(eventDto: EventDTO) {
    console.log("validator changeColorLobby");
    var colorExist = eventDto.gameData.players.some(
        (player) => player.color == eventDto.params.color
    );
    if (colorExist) {
        return new ValidatorResponseModel(
            eventDto.gameData,
            "El color ya esta en uso"
        );
    }
    var i = utils.getPlayerIndex(eventDto);
    eventDto.gameData.players[i].color = eventDto.params.color;
    return new ValidatorResponseModel(eventDto.gameData);
}

export async function startGame(eventDto: EventDTO) {
    console.log("validator startGame");
    if (utils.adminValid(eventDto)) return utils.adminValid(eventDto);
    // Controlar el estado inicial del juego
    eventDto.gameData.status = 1;
    return new ValidatorResponseModel(eventDto.gameData);
}

export async function changeLobbyAdmin(eventDto: EventDTO) {
    console.log("validator changeLobbyAdmin");
    if (utils.adminValid(eventDto)) return utils.adminValid(eventDto);
    for (let i = 0; i < eventDto.gameData.players.length; i++) {
        if (eventDto.gameData.players[i].admin)
            eventDto.gameData.players[i].admin = false;
        if (eventDto.gameData.players[i].id == eventDto.params.userId)
            eventDto.gameData.players[i].admin = true;
    }
    return new ValidatorResponseModel(eventDto.gameData);
}
