import userController from '../../controllers/userController.js';
import ROLES_LIST from '../../config/roles_list.js';
import verifyRoles from '../../middleware/verifyRoles.js';
import express from 'express';
const router = express.Router();


router
    .get('/users', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.VIEWER), userController.getAllUsers)
    .get('/users/:id', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.VIEWER), userController.getUser)
    .delete('/users/delete/:id', verifyRoles(ROLES_LIST.ADMIN), userController.deleteUser)
    .put('/users/update/:id', verifyRoles(ROLES_LIST.ADMIN),userController.update)
    .patch('/users/addFavoriteRecipe/:id', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER),userController.addFavoriteRecipe)
   
export default router;
