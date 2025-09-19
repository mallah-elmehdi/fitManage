// SET UP
import express from 'express';

// CONTROLLER
import assessment from '../controllers/assessmentController';

// ROUTER
const router = express.Router();

// ------
router.route('/').post(assessment.createAssessment);
router.route('/:assessmentId').delete(assessment.deleteAssessmentById);

export default router;


