import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createAssessmentService = async (data) => {
    try {
        return await prisma.assessment.create({ data });
    } catch (error) {
        throw error;
    }
};

const deleteAssessmentByIdService = async (id) => {
    try {
        return await prisma.assessment.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    createAssessmentService,
    deleteAssessmentByIdService,
};
