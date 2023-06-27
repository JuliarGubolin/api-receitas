import express from 'express';
import registerController from '../../controllers/registerController.js';
const router = express.Router();

router.post('/auth/register', registerController.handleNewUser);

export default router;
