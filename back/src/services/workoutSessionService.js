import { PrismaClient } from '@prisma/client';
import { getYearStart } from '../utils/func';

const prisma = new PrismaClient();

const createWorkoutSessionService = async (data) => {
    try {
        return await prisma.workoutSession.create({ data });
    } catch (error) {
        throw error;
    }
};
const getWorkoutSessionByIdService = async (id) => {
    try {
        return await prisma.workoutSession.findUnique({
            where: {
                id,
            },
            include: {
                exercises: {
                    include: {
                        exercise_format: true,
                    },
                },
            },
        });
    } catch (error) {
        throw error;
    }
};

const getAllWorkoutsByAthleteIdService = async (athleteId) => {
    try {
        return await prisma.workoutSession.findMany({
            where: {
                athleteId,
                microcycle: {
                    mesocycle: {
                        macrocycle: {
                            start_date: getYearStart(new Date()),
                        },
                    },
                },
            },
            include: {
                microcycle: {
                    include: {
                        mesocycle: {
                            include: 'macrocycle',
                        },
                    },
                },
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    createWorkoutSessionService,
    getAllWorkoutsByAthleteIdService,
    getWorkoutSessionByIdService,
};
