import AuthController from "../../controllers/AuthController.js";
import express  from "express";
const router = express.Router();

router
    .post('/auth/register', AuthController.addUser)
    .post('/auth/login', AuthController.login)
    .get('/auth/logout', AuthController.logout)


export default router;