import { MongoClient, Db } from "mongodb";
import { GameModel } from "./models/gameModel";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?connectTimeoutMS=3000`;
const client = new MongoClient(uri);

var db: Db;

(async () => {
    try {
        await client.connect();
        db = client.db(process.env.MONGO_DB);
        console.log("- MongoDB connect");
    } catch (error: any) {
        console.error("Error conectando a MongoDB:", error);
        throw error;
    }
})();

export const newRoom = async (gameId: number): Promise<Boolean> => {
    try {
        const result = await db
            .collection<GameModel>("games")
            .insertOne(new GameModel(gameId));
        console.log("Documento agregado con ID:", result.insertedId);
        return true;
    } catch (error) {
        console.error("Error al agregar nuevo game:", error);
        return false;
    }
};

export const updateRoom = async (game: GameModel): Promise<Boolean> => {
    try {
        const result = await db
            .collection<GameModel>("games")
            .updateOne({ id: game.id }, { $set: game });
        return result.matchedCount > 0;
    } catch (error) {
        console.error("Error al updatear el game:", error);
        return false;
    }
};

export const getRoom = async (roomId: number): Promise<GameModel | null> => {
    try {
        return await db.collection<GameModel>("games").findOne({ id: roomId });
    } catch (error) {
        console.error("Error al obtener el game:", error);
        return null;
    }
};
