import { StatusCodes } from 'http-status-codes';
import assessmentService from '../services/assessmentService';

const { createAssessmentService, deleteAssessmentByIdService } = assessmentService;

const createAssessment = async (req, res, next) => {
    try {
        const newAssessment = await createAssessmentService(req.body);

        return res.status(StatusCodes.OK).json({
            message: 'Assessment created successfully',
            result: newAssessment,
        });
    } catch (error) {
        return next(error);
    }
};

const deleteAssessmentById = async (req, res, next) => {
    try {
        const deletedAssessment = await deleteAssessmentByIdService(parseInt(req.params.assessmentId));

        return res.status(StatusCodes.OK).json({
            message: 'Assessment deleted successfully',
            result: deletedAssessment,
        });
    } catch (error) {
        return next(error);
    }
};

export default {
    createAssessment,
    deleteAssessmentById,
};
