import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "testdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export async function select(query: string, params: any[]): Promise<any[]> {
    const [rows] = await pool.execute(query, params);
    return rows as any[];
}

export async function insert(query: string, params: any[]): Promise<number> {
    try {
        const [result] = await pool.execute(query, params);
        return (result as any).insertId;
    } catch (error) {
        console.error("insert error", query, params);
        throw error;
    }
}
