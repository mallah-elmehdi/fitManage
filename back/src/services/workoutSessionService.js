import { PrismaClient } from '@prisma/client';
import { getMonthStart, getYearStart } from '../utils/func';

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

const getWorkoutSessionByDateService = async (date, athleteId) => {
    try {
        return await prisma.workoutSession.findFirst({
            where: {
                date,
                athleteId,
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
                            include: { macrocycle: true },
                        },
                    },
                },
            },
        });
    } catch (error) {
        throw error;
    }
};

const getAllWorkoutSessionsService = async ({ monthIndex }) => {
    try {
        return await prisma.workoutSession.findMany({
            where: {
                microcycle: {
                    mesocycle: {
                        macrocycle: {
                            start_date: getYearStart(new Date()),
                        },
                        start_date: getMonthStart(new Date().setMonth(parseInt(monthIndex))),
                    },
                },
            },
            include: {
                athlete: true,
                microcycle: {
                    include: {
                        mesocycle: {
                            include: { macrocycle: true },
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
    getAllWorkoutSessionsService,
    getWorkoutSessionByDateService,
};
