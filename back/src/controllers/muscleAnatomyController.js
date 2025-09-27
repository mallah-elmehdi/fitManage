import { StatusCodes } from 'http-status-codes';
import muscleAnatomyService from '../services/muscleAnatomyService';

const { createMuscleAnatomyService, updateMuscleAnatomyService, getMuscleAnatomyByNamesService } = muscleAnatomyService;


// ! -------------------------------------------------------- not used yetdb-json
const createMuscleAnatomy = async (req, res, next) => {
    try {
        const athlete = await createMuscleAnatomyService(req.body);

        return res.status(StatusCodes.OK).json({
            message: 'muscle anatomy was created successfully',
            result: athlete,
        });
    } catch (error) {
        return next(error);
    }
};

const updateMuscleAnatomyById = async (req, res, next) => {
    try {
        const athlete = await updateMuscleAnatomyService({
            id: parseInt(req.params.muscleAnatomyId),
        });

        return res.status(StatusCodes.OK).json({
            message: 'muscle anatomy was updated successfully',
            result: athlete,
        });
    } catch (error) {
        return next(error);
    }
};

const getMuscleAnatomyByNames = async (req, res, next) => {
    try {
        const athlete = await getMuscleAnatomyByNamesService(req.query.muscleAnatomyByNames);

        return res.status(StatusCodes.OK).json({
            message: 'muscle anatomy was fetched successfully',
            result: athlete,
        });
    } catch (error) {
        return next(error);
    }
};

export default {
    createMuscleAnatomy,
    getMuscleAnatomyByNames,
    updateMuscleAnatomyById,
};
