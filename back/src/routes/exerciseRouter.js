// SET UP
import express from 'express';

// CONTROLLER
import exercise from '../controllers/exerciseController';

// ROUTER
const router = express.Router();

// ------
router.route('/json-db-setup').post(exercise.exerciseJsonDBSetUp);
router.route('/all').get(exercise.getAllExercisesWithPagination);

export default router;
