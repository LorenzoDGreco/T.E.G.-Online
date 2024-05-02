import express, { Request, Response } from "express";
import * as games from "./src/controllers/games";
import * as rooms from "./src/controllers/rooms";
import * as cards from "./src/controllers/cards";
import * as users from "./src/controllers/users";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users/actual", (q, s) => users.actual(q, s));
app.post("/users/setname", (q, s) => users.setName(q, s));


// puede recibir un parametro get con el ultimo cambio, en este caso valida si hubo un cambio
// ademas puede recibir un parametro password
app.get("/rooms/get/:id", (q, s) => rooms.getById(q, s));

app.get("/rooms/list", (q, s) => rooms.list(q, s));
app.post("/rooms/new", (q, s) => rooms.newRoom(q, s)); // recibe nombre y contraseña de la sala
app.get("/rooms/history", (q, s) => rooms.history(q, s));
app.post("/rooms/settings", (q, s) => rooms.settings(q, s)); // configs, nombre y conbtra
app.post("/rooms/color", (q, s) => rooms.color(q, s)); // no se puede repetir el color
app.get("/rooms/start", (q, s) => rooms.start(q, s));

app.post("/games/war/init", (q, s) => games.warInit(q, s)); // Recibe codeDesde codeHasta | Al terminar borrar el "war"
app.get("/games/war/dices", (q, s) => games.warDices(q, s));
app.post("/games/war/move", (q, s) => games.warMove(q, s));
app.post("/games/armies/reposition", (q, s) => games.armiesReposition(q, s)); // Desde Hasta
app.post("/games/armies/put", (q, s) => games.armiesPut(q, s));
app.get("/games/phase/end", (q, s) => games.armiesEnd(q, s));   // dentro de "war" deberia guardarse si se gano alguna guerra dentro del turno, para conseguir carta

app.get("/games/card/change", (q, s) => cards.cardChange(q, s));

app.listen(process.env.PORT, () => {
  console.log("- Server");
});
