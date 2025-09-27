import { StatusCodes } from 'http-status-codes';
import muscleImbalanceService from '../services/muscleImbalanceService';
import muscleAnatomyService from '../services/muscleAnatomyService';

const { createMuscleImbalanceService, updateMuscleImbalanceService, getMuscleImbalanceByNamesService, getMuscleImbalanceAllService } =
    muscleImbalanceService;
const { muscleAnatomyJsonDBSetUpService } = muscleAnatomyService;

const muscleImbalanceJsonDBSetUp = async (req, res, next) => {
    try {
        const muscleImbalance = await muscleAnatomyJsonDBSetUpService();

        return res.status(StatusCodes.OK).json({
            message: 'muscle Imbalance set up was created successfully',
            result: muscleImbalance,
        });
    } catch (error) {
        return next(error);
    }
};

const getMuscleImbalanceAll = async (req, res, next) => {
    try {
        const muscleImbalance = await getMuscleImbalanceAllService();

        return res.status(StatusCodes.OK).json({
            message: 'muscle Imbalance was fetched successfully',
            result: muscleImbalance,
        });
    } catch (error) {
        return next(error);
    }
};

// ! ------------------------------------------------------------------------------- not used uet
const createMuscleImbalance = async (req, res, next) => {
    try {
        const athlete = await createMuscleImbalanceService(req.body);

        return res.status(StatusCodes.OK).json({
            message: 'muscle Imbalance was created successfully',
            result: athlete,
        });
    } catch (error) {
        return next(error);
    }
};

const updateMuscleImbalanceById = async (req, res, next) => {
    try {
        const athlete = await updateMuscleImbalanceService({
            id: parseInt(req.params.muscleImbalanceId),
        });

        return res.status(StatusCodes.OK).json({
            message: 'muscle Imbalance was updated successfully',
            result: athlete,
        });
    } catch (error) {
        return next(error);
    }
};

const getMuscleImbalanceByNames = async (req, res, next) => {
    try {
        const athlete = await getMuscleImbalanceByNamesService(req.query.muscleImbalanceByNames);

        return res.status(StatusCodes.OK).json({
            message: 'muscle Imbalance was fetched successfully',
            result: athlete,
        });
    } catch (error) {
        return next(error);
    }
};

export default {
    muscleImbalanceJsonDBSetUp,
    getMuscleImbalanceAll,
    createMuscleImbalance,
    getMuscleImbalanceByNames,
    updateMuscleImbalanceById,
};
