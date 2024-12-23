import { Socket } from "socket.io";
import { select, insert } from "./mysql";
import { events } from "./events/eventsRouter";
import { ResponseModel } from "./models/responseModel";

export async function generateLobbyCode(): Promise<string> {
    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let resultado = "";
    while (true) {
        for (let i = 0; i < 6; i++) {
            const indiceAleatorio = Math.floor(
                Math.random() * caracteres.length
            );
            resultado += caracteres.charAt(indiceAleatorio);
        }

        let exist = await select(
            "SELECT id FROM games WHERE code = ? LIMIT 1",
            [resultado]
        );
        if (!exist.length) return resultado;
    }
}

export async function genericError(
    socket: Socket,
    error_code: string,
    error: string
): Promise<void> {
    console.log("Error generico:", error_code, error);
    socket.emit("error", new ResponseModel("", error_code, error));
}

export function getActualGame(socket: Socket): number {
    var gameId: number = 0;
    Array.from(socket.rooms).forEach((r) => {
        if (r !== socket.id) gameId = parseInt(r);
    });
    return gameId;
}

// export async function addEvent(
//     socket: Socket,
//     event: string,
//     params: string,
//     priv: boolean = false
// ) {
    
//     insert(
//         "INSERT INTO game_events (game_id, user_id, type, params, private, create_date) VALUES (?, ?, ?, ?, ?, NOW())",
//         [getActualGame(socket), socket.data.userId, eventType, priv ? 1 : 0]
//     );
// }

// export async function genericSuccess(
//     socket: Socket,
//     success_code: string,
//     message: string,
//     data: any = null
//   ): Promise<void> {
//     socket.emit("success", new ResponseModel(data, success_code, message));
//   }
