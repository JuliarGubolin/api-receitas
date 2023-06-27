import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
//import cors from 'cors';
//import corsOptions from './src/config/corsOptions.js';

import errorHandler from './src/middleware/errorHandler.js';
import verifyJWT from './src/middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import credentials from './src/middleware/credentials.js';
import mongoose from 'mongoose';
import routesUser from './src/routes/users/index.js';
import routesAuth from './src/routes/auth/index.js';
import connectDB from './src/config/dbConn.js';
const PORT = process.env.PORT || 3000;

connectDB();

app.use(credentials);

//app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser())

routesAuth(app);
app.use(verifyJWT)
routesUser(app);


app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
