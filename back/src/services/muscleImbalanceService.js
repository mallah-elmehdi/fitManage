import { DistortionType, PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const dbJson = path.join(__dirname, '../utils/muscle-imbalance.json');

const muscleImbalanceJsonDBSetUpService = async () => {
    try {
        const data = JSON.parse(fs.readFileSync(dbJson));

        const existingRecords = await prisma.muscleImbalance.findMany({
            where: {
                name: { in: data.map((item) => item.name) },
            },
            select: { name: true },
        });

        const existingItems = new Set(existingRecords.map((record) => record.name));

        const newRecords = data
            .filter((item) => !existingItems.has(item.name))
            .map(({ name, posture_type, posture_image, image, overactive, underactive }) => ({
                name,
                posture_type,
                posture_image,
                image,
                // muscle_anatomy: muscleAnatomy.filter((muscle) =>
                //     [overactive.map((over) => over.name), underactive.map((under) => under.name)].flat(Infinity).includes(muscle.name)
                // ),
            }));

        let result = [];
        if (newRecords.length > 0) {
            result = await prisma.muscleImbalance.createMany({
                data: newRecords,
                skipDuplicates: true, // Optional: if your unique constraint might still cause issues
            });
        }
        if (result.length === 0) {
            result = await getMuscleImbalanceAllService();
        }
        return result;
    } catch (error) {
        throw error;
    }
};

const getMuscleImbalanceAllService = async (data) => {
    try {
        return await prisma.muscleImbalance.findMany({
            include: {
                muscle_anatomy: true,
            },
        });
    } catch (error) {
        throw error;
    }
};

//! ---------------------------------------------------------- NOT USED YET

const createMuscleImbalanceService = async (data) => {
    try {
        return await prisma.athlete.create({ data });
    } catch (error) {
        throw error;
    }
};

const updateMuscleImbalanceService = async ({ id, data }) => {
    try {
        return await prisma.muscleImbalance.update({
            where: {
                id,
            },
            data,
        });
    } catch (error) {
        throw error;
    }
};
const getMuscleImbalanceByNamesService = async (muscleImbalanceByNames) => {
    try {
        return await prisma.athlete.findMany({
            where: {
                name: {
                    in: muscleImbalanceByNames ? muscleImbalanceByNames.split(',') : undefined,
                },
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    createMuscleImbalanceService,
    getMuscleImbalanceAllService,
    updateMuscleImbalanceService,
    getMuscleImbalanceByNamesService,
    muscleImbalanceJsonDBSetUpService,
};
