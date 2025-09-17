// SET UP
import express from 'express';

// CONTROLLER
import athlete from '../controllers/athleteController';

// ROUTER
const router = express.Router();

// ------
router.route('/init').post(athlete.createInitAthlete);
router.route('/all').get(athlete.getAllAthletes);
router.route('/:athleteId').get(athlete.getAthleteById);

export default router;
