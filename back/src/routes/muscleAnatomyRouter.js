// SET UP
import express from 'express';

// CONTROLLER
import muscleAnatomy from '../controllers/muscleAnatomyController';

// ROUTER
const router = express.Router();

// ------
// router.route('/').get(muscleAnatomy.getMuscleAnatomyByNames).post(muscleAnatomy.createMuscleAnatomy);
// router.route('/:muscleAnatomyId').put(muscleAnatomy.updateMuscleAnatomyById);

export default router;
