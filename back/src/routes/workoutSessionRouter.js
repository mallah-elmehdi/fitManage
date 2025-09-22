// SET UP
import express from 'express';

// CONTROLLER
import workoutSession from '../controllers/workoutSessionController';

// ROUTER
const router = express.Router();

// ------
router.route('/').post(workoutSession.createWorkoutSession).get(workoutSession.getAllWorkoutsByAthleteId);
router.route('/all').get(workoutSession.getAllWorkoutSessions);
router.route('/:workoutSessionId').get(workoutSession.getWorkoutSessionById);

export default router;
