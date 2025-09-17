import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import athleteService from '../services/athleteService';

const prisma = new PrismaClient();

const { createInitAthleteService, getAllAthletesService, getAthleteByIdService } = athleteService;

const createInitAthlete = async (req, res, next) => {
    try {
        const newAthlete = await createInitAthleteService(req.body);

        return res.status(StatusCodes.OK).json({
            message: 'Athlete created successfully',
            result: newAthlete,
        });
    } catch (error) {
        return next(error);
    }
};

const getAllAthletes = async (req, res, next) => {
    try {
        const athletes = await getAllAthletesService(req.body);

        return res.status(StatusCodes.OK).json({
            message: 'List of all athletes fetched successfully',
            result: athletes,
        });
    } catch (error) {
        return next(error);
    }
};

const getAthleteById = async (req, res, next) => {
    try {
        const athlete = await getAthleteByIdService(parseInt(req.params.athleteId));

        return res.status(StatusCodes.OK).json({
            message: 'Athlete was fetched successfully',
            result: athlete,
        });
    } catch (error) {
        return next(error);
    }
};

export default {
    createInitAthlete,
    getAllAthletes,
    getAthleteById,
};
