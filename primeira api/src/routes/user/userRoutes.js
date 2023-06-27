import UserController from "../../controllers/UserController.js";
import express  from "express";
const router = express.Router();

router  
    .get('/users', UserController.users)
    .get('/users/:id', UserController.findUser)
    .patch('/users/addFavoriteRecipe/:id', UserController.addFavoriteRecipes)
    .put('/users/update/:id', UserController.update)
    .delete('/users/delete/:id', UserController.delete)

export default router;
