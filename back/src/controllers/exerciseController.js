import { StatusCodes } from 'http-status-codes';
import exerciseService from '../services/exerciseService';

const { exerciseJsonDBSetUpService, getAllExercisesWithPaginationService } = exerciseService;

const exerciseJsonDBSetUp = async (req, res, next) => {
    try {
        await exerciseJsonDBSetUpService();

        return res.status(StatusCodes.OK).json({
            message: 'Initial DB was set up successfully',
            result: [],
        });
    } catch (error) {
        return next(error);
    }
};

const getAllExercisesWithPagination = async (req, res, next) => {
    try {
        const page = req.query.page || '1';
        const result = await getAllExercisesWithPaginationService(parseInt(page));

        console.log(result);

        return res.status(StatusCodes.OK).json({
            message: 'Fetched data successfully',
            result: result,
        });
        s;
    } catch (error) {
        return next(error);
    }
};

export default {
    exerciseJsonDBSetUp,
    getAllExercisesWithPagination,
};
