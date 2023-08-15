import express from 'express';
import controller from '../controllers/employees';
const router = express.Router();

router.get('/', controller.getEmployees);
router.get('/:id', controller.findById);
router.get('/categorized/scores', controller.categorizedScores);

export = router;