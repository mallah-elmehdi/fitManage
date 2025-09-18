import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createMedicalAndHealthHistoryService = async (data) => {
    try {
        return await prisma.medicalAndHealthHistory.create({ data });
    } catch (error) {
        throw error;
    }
};

const deleteMedicalAndHealthHistoryByIdService = async (id) => {
    try {
        return await prisma.medicalAndHealthHistory.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    createMedicalAndHealthHistoryService,
    deleteMedicalAndHealthHistoryByIdService,
};
