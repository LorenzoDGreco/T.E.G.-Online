import { Socket } from "socket.io";

import * as utils from "./../utils";
import { select, insert } from "./../mysql";
import * as mongo from "./../mongo";
import { EventModel } from "../models/eventModel";
import * as eventsRouter from "./eventsRouter";

export async function newLobby(io: any, socket: Socket, data: EventModel) {
    var code = await utils.generateLobbyCode();
    let gameId = await insert("INSERT INTO games (code) VALUES (?)", [code]);
    var user = await select("SELECT username FROM users WHERE id = ? LIMIT 1", [socket.data.userId])

    var newData: EventModel = {
        name: "joinLobby",
        params: `{"code":"${code}", "name": "${user[0].username}"}`,
    };
    await mongo.newRoom(gameId);
    eventsRouter.newEvent(io, socket, newData);
}

export async function joinLobby(io: any, socket: Socket, data: EventModel) {
    var lobby = await select("SELECT id FROM games WHERE code = ?", [
        data.params.code,
    ]);
    if (!lobby.length) {
        utils.genericError(
            socket,
            "game_code_not_valid",
            "El codigo de sala no es valido"
        );
        return;
    }

    var gameId = lobby[0].id;

    if (socket.rooms.size > 1) {
        Array.from(socket.rooms).forEach((room) => {
            if (room !== socket.id) socket.leave(room);
        });
        utils.genericError(
            socket,
            "game_code_error",
            "Estaba en una sala. Se cambio a la nueva sala"
        );
    }

    // var userGamesList = await select(
    //     "SELECT game_id FROM user_game WHERE game_id = ? LIMIT 1",
    //     [gameId]
    // );
    // var admin = userGamesList.length ? 0 : 1; // Fijarse si poner el [0]

    // insert("INSERT INTO user_game (user_id, game_id, admin) VALUES (?, ?, ?)", [
    //     socket.data.userId,
    //     gameId,
    //     admin,
    // ]);
    socket.join(gameId);
}

export async function leaveLobby(io: any, socket: Socket, data: EventModel) {
    //TODO: Validar que no se encuentra la partida iniciada

    var gameId = utils.getActualGame(socket);

    if (!gameId) {
        utils.genericError(
            socket,
            "not_lobby",
            "No se encuentra en ninguna sala actualmente"
        );
        return;
    }

    // Verificamos si el usuario realmente está en la sala
    var user_game = await select(
        "SELECT id FROM user_game WHERE user_id = ? AND game_id = ? LIMIT 1",
        [socket.data.userId, gameId]
    );
    if (!user_game.length) {
        utils.genericError(
            socket,
            "leave_lobby_error",
            "No estás en esta sala"
        );
        return;
    }

    // Eliminamos al usuario de la base de datos
    console.log("insert 3");
    await insert("DELETE FROM user_game WHERE id = ?", [user_game[0]["id"]]);
    console.log("insert 3");

    // Quitamos al usuario de la sala
    socket.leave(gameId.toString());
}