// SET UP
import express from 'express';

// CONTROLLER
import muscleImbalance from '../controllers/muscleImbalanceController';

// ROUTER
const router = express.Router();

// ------
router.route('/json-db-setup').post(muscleImbalance.muscleImbalanceJsonDBSetUp);
router.route('/all').get(muscleImbalance.getMuscleImbalanceAll);
// router.route('/').get(muscleImbalance.getMuscleImbalanceByNames).post(muscleImbalance.createMuscleImbalance);
// router.route('/:muscleImbalanceId').put(muscleImbalance.updateMuscleImbalanceById);

export default router;
