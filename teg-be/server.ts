import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { newEvent } from "./src/events/eventsRouter";
import { select, insert } from "./src/mysql";
import * as util from "./src/utils";
import { ResponseModel } from "./src/models/responseModel";
import { EventModel } from "./src/models/eventModel";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.get("/", (req, res) => {
    res.send("Socket.IO Server is running");
});

// Manejar conexiones de Socket.IO
io.on("connection", (socket: Socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on(
        "login",
        async (data: {username: string, password: string, token: string}) => {
            var username = data.username ? data.username : '';
            var token = data.token ? data.token : '';
            var password = data.password ? data.password : '';
            
            var users = await select(
                "SELECT id, username, email, token FROM users WHERE token = ? OR (username = ? AND password = ?) LIMIT 1",
                [token, username, password]
            );
            if (users.length) {
                socket.data.userId = users[0].id;
                users[0].id = "";
                socket.emit("login", new ResponseModel(users[0]));
            } else {
                socket.emit(
                    "login",
                    new ResponseModel(
                        "",
                        "login_not_found",
                        "El usuario o la contraseña no coinciden"
                    )
                );
            }
        }
    );

    socket.on("event", (data: EventModel) => {
        if (!socket.data.userId) {
            util.genericError(
                socket,
                "user_not_login",
                "Error al detectar el usuario. Reinicie la pagina"
            );
            return;
        }

        console.log("Evento:", data);
        newEvent(io, socket, data);
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

// Iniciar el servidor
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});