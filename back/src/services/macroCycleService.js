import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createMacroCycleService = async (data) => {
    try {
        return await prisma.macroCycle.create({ data });
    } catch (error) {
        throw error;
    }
};

const getMacroCycleByStartDateService = async (date, athleteId) => {
    try {
        return await prisma.macroCycle.findUnique({
            where: {
                start_date: date,
                athleteId: athleteId,
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    createMacroCycleService,
    getMacroCycleByStartDateService,
};
