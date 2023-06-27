import express from "express";
import authRoutes from "./routes/auth/index.js";
import recipesRoutes from "./routes/recipes/index.js";
import userRoutes from "./routes/user/index.js";
import unitRoutes from "./routes/unit/index.js"
import db from '../src/config/dbConfig.js';
import verifyJWT from '../src/middleware/verifyJWT.js'

db.on('error', console.log.bind(console, 'Connection error.'));
db.once('open', () => {
    console.log('Database connection successfully made.')
})

const app = express();
app.use(express.json());

authRoutes(app);

app.use(verifyJWT);
userRoutes(app);
recipesRoutes(app);
unitRoutes(app);

export default app;
