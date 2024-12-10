import * as mysql from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err: any) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
    return;
  }
  console.log("- Mysql");
});

export function query(sql: string, values?: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error: any, results: any, fields: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
