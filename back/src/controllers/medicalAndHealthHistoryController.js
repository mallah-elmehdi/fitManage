import { StatusCodes } from 'http-status-codes';
import medicalAndHealthHistoryService from '../services/medicalAndHealthHistoryService';

const { createMedicalAndHealthHistoryService, deleteMedicalAndHealthHistoryByIdService } = medicalAndHealthHistoryService;

const createMedicalAndHealthHistory = async (req, res, next) => {
    try {
        const newMedicalAndHealthHistory = await createMedicalAndHealthHistoryService(req.body);

        return res.status(StatusCodes.OK).json({
            message: 'MedicalAndHealthHistory created successfully',
            result: newMedicalAndHealthHistory,
        });
    } catch (error) {
        return next(error);
    }
};

const deleteMedicalAndHealthHistoryById = async (req, res, next) => {
    try {
        const deletedMedicalAndHealthHistory = await deleteMedicalAndHealthHistoryByIdService(
            parseInt(req.params.medicalAndHealthHistoryId)
        );

        return res.status(StatusCodes.OK).json({
            message: 'Medical and health history deleted successfully',
            result: deletedMedicalAndHealthHistory,
        });
    } catch (error) {
        return next(error);
    }
};

export default {
    createMedicalAndHealthHistory,
    deleteMedicalAndHealthHistoryById,
};
