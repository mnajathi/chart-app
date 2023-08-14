import express from 'express';
import controller from '../controllers/employees';
const router = express.Router();

router.get('/', controller.getEmployees);

export = router;