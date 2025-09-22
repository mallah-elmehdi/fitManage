import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createMicroCycleService = async (data) => {
    try {
        return await prisma.microCycle.create({ data });
    } catch (error) {
        throw error;
    }
};

const getMicroCycleByStartDateService = async (date, athleteId) => {
    try {
        return await prisma.microCycle.findUnique({
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
    createMicroCycleService,
    getMicroCycleByStartDateService,
};
