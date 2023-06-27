import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set('strictQuery', true);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@desafio-nodejs.z89lz8p.mongodb.net/desafio-nodejs`);

let db = mongoose.connection;

export default db;
