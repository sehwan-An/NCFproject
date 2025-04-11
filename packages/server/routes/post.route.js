import express from 'express';
import controllers from '../controllers/regist.controllers.js';
const router = express.Router();


router.post('/', controllers.regist);

export default router;
