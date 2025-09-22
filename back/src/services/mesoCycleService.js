import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createMesoCycleService = async (data) => {
    try {
        return await prisma.mesoCycle.create({ data });
    } catch (error) {
        throw error;
    }
};

const getMesoCycleByStartDateService = async (date, athleteId) => {
    try {
        return await prisma.mesoCycle.findUnique({
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
    createMesoCycleService,
    getMesoCycleByStartDateService,
};
