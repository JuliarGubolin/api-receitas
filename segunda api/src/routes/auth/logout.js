import express from 'express';
import logoutController from '../../controllers/logoutController.js'
const router = express.Router();


router.get('/auth/logout', logoutController.handleLogout);

export default router;
