import express  from "express";
import UnitController from "../../controllers/UnitController.js";
import ROLES_LIST from "../../config/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js";

const router = express.Router();

router
    .post('/units/new', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), UnitController.addUnit)
    .get('/units/units', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), UnitController.findAllUnits)
    .get('/units/:id',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), UnitController.findUnitById)
    .put('/units/update/:id',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), UnitController.updateUnit)
    .delete('/units/delete/:id',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), UnitController.deleteUnit)

export default router;
