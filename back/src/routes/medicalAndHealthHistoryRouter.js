// SET UP
import express from 'express';

// CONTROLLER
import medicalAndHealthHistory from '../controllers/medicalAndHealthHistoryController';

// ROUTER
const router = express.Router();

// ------
router.route('/').post(medicalAndHealthHistory.createMedicalAndHealthHistory);
router.route('/:medicalAndHealthHistoryId').delete(medicalAndHealthHistory.deleteMedicalAndHealthHistoryById);

export default router;
