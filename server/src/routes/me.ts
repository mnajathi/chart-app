import express from 'express';
import controller from '../controllers/me';
const router = express.Router();

router.get('/', controller.getMe);

export = router;