import express from 'express';
import {login, registration} from '../controllers/userController.js'

const router = express.Router();

router.post('/registration', registration);
router.post('/login', login);

export default router; 