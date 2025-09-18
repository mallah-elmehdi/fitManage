import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createInitAthleteService = async (data) => {
    try {
        return await prisma.athlete.create({ data });
    } catch (error) {
        throw error;
    }
};

const getAllAthletesService = async () => {
    try {
        return await prisma.athlete.findMany();
    } catch (error) {
        throw error;
    }
};

const getAthleteByIdService = async (id) => {
    try {
        return await prisma.athlete.findUnique({
            where: {
                id,
            },
            include: {
                assessments: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                medical_and_health_histories: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    createInitAthleteService,
    getAllAthletesService,
    getAthleteByIdService,
};
