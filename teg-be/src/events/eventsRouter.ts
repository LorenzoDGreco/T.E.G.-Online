import { Socket } from "socket.io";
import { EventDTO } from "../models/eventDTO";
import * as mongo from "./../mongo";
import * as utils from "./../utils";
import { GameModel } from "../models/gameModel";
import { ValidatorResponseModel } from "../models/validatorResponseModel";
import { select, insert } from "./../mysql";
import * as lobby from "./lobbyEvents";
import { EventModel } from "../models/eventModel";
import { Console } from "console";

export const events = {
    1: { group: "lobby", name: "newLobby" },
    2: { group: "lobby", name: "joinLobby" },
    3: { group: "lobby", name: "leaveLobby" },
    4: { group: "lobby", name: "changeColorLobby" },
    5: { group: "lobby", name: "changeConfigLobby" },
    // 6: { group: "lobby", name: "changeLobbyName" },
    7: { group: "lobby", name: "startGame" },
    // 8: { group: "lobby", name: "changeLobbyPassword" },
    9: { group: "lobby", name: "changeLobbyAdmin" },
    10: { group: "inGame", name: "setPlayerObjective" },
    11: { group: "inGame", name: "setInitialCards" },
    12: { group: "inGame", name: "setPlayerOrder" },
    13: { group: "inGame", name: "changePhase" },
    14: { group: "inGame", name: "addNewCard" },
    15: { group: "inGame", name: "finishedGame" },
    16: { group: "inGame", name: "pausedGame" },
    17: { group: "inGame", name: "redeemCard" },
    18: { group: "inGame", name: "deployTroop" },
    19: { group: "attack", name: "initAttack" },
    20: { group: "attack", name: "rollAttackerDice" },
    21: { group: "attack", name: "resultAttackerDice" },
    22: { group: "attack", name: "rollDefenderDice" },
    23: { group: "attack", name: "resultDefenderDice" },
    24: { group: "attack", name: "repositionAfterAttackWin" },
    25: { group: "attack", name: "repositionAfterPhase" },
};

export async function newEvent(io: any, socket: Socket, data: EventModel) {
    const event = Object.values(events).find((e) => e.name === data.name);

    if (!event) {
        console.error(`Event with name "${data.name}" not found.`);
        return;
    }

    // Crea el dto
    var eventType;
    Object.entries(events).forEach(([key, e]: [string, any]) => {
        if (e.name == event.name) eventType = key;
    });
    if (!eventType) {
        var err =
            "ERROR newEvent() parametro event no esta en el objecto. Event: ";
        console.error(err, event);
        throw err + event;
    }

    try {
        data.params = JSON.parse(data.params);
    } catch (error) {
        utils.genericError(
            socket,
            "evento_invalido",
            "Los parametros no son validos"
        );
        console.error("ERROR json parse");
        console.error("Params:", data.params);
        console.error("Error:", error);
        console.error("--------------------");
        return;
    }

    // Comprobar si es privado
    var isPrivateEvent = data.name == "setPlayerObjective" ? 1 : 0;
    // Llama a las funciones que modifican la base de datos
    switch (data.name) {
        case "newLobby":
            await lobby.newLobby(io, socket, data);
            return;
        case "joinLobby":
            await lobby.joinLobby(io, socket, data);
            break;
        case "leaveLobby":
            await lobby.leaveLobby(io, socket, data);
            break;
    }

    const gameId = utils.getActualGame(socket);

    var gameData: GameModel | null = await mongo.getRoom(gameId);

    if (!gameData) {
        console.error("gameData sin valor | rooms:", Array.from(socket.rooms));
        return;
    }

    var eventDto: EventDTO = {
        name: data.name,
        type: eventType,
        user_id: socket.data.userId,
        params: data.params,
        private: isPrivateEvent,
        gameData: gameData,
    };

    // Valida el evento
    try {
        // console.log("event.group", event.group, eventDto);

        const groupModuleValidator = require(`./validator/${event.group}Validator`);
        const funcValidator = groupModuleValidator[event.name];
        if (funcValidator) {
            var resValidator: ValidatorResponseModel = await funcValidator(
                eventDto
            ); // Llamar a la función
        } else {
            utils.genericError(
                socket,
                "id_event_group_invalid",
                "Este error no deberia pasar. Si ve esto contacte a soporte. Gracias"
            );
            console.error(
                "Error al llamar a la funcion",
                "Archivo:",
                `./validator/${event.group}Validator`,
                "Funcion:",
                event.name
            );
            return;
        }
    } catch (error) {
        throw "Error al llamar al validador: " + error;
    }

    if (!resValidator.status) {
        utils.genericError(socket, "evento_invalido", resValidator.error);
        return;
    }

    mongo.updateRoom(resValidator.gameData);
    insert(
        "INSERT INTO game_events (game_id, user_id, type, params, private) VALUES (?, ?, ?, ?, ?)",
        [
            gameId,
            eventDto.user_id,
            eventDto.type,
            eventDto.params,
            isPrivateEvent,
        ]
    );

    io.to(gameId).emit("event", eventDto);
}
