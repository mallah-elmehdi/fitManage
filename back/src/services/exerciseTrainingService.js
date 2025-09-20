import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createExerciseTrainingService = async (data) => {
    try {
        return await prisma.exercise.create({ data });
    } catch (error) {
        throw error;
    }
};

const createManyExercisesTrainingService = async (data) => {
    try {
        return await prisma.exercise.createMany({ data });
    } catch (error) {
        throw error;
    }
};

export default {
    createExerciseTrainingService,
    createManyExercisesTrainingService,
};
