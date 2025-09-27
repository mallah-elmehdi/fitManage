import { DistortionType, PrismaClient } from '@prisma/client';
import muscleImbalanceService from './muscleImbalanceService';

import fs from 'fs';
import path from 'path';

const { muscleImbalanceJsonDBSetUpService } = muscleImbalanceService;
const prisma = new PrismaClient();
const dbJson = path.join(__dirname, '../utils/muscle-imbalance.json');

const muscleAnatomyJsonDBSetUpService = async () => {
    try {
        const muscleImbalance = await muscleImbalanceJsonDBSetUpService();

        const data = JSON.parse(fs.readFileSync(dbJson))
            .map(({ overactive, underactive, name }) => {
                const muscleImbalanceName = name;

                return [
                    overactive.map(({ name, image }) => ({ muscleImbalanceName, name, image, distortion_type: DistortionType.OVERACTIVE })),
                    underactive.map(({ name, image }) => ({
                        muscleImbalanceName,
                        name,
                        image,
                        distortion_type: DistortionType.UNDERACTIVE,
                    })),
                ];
            })
            .flat(Infinity);

        const existingRecords = await prisma.muscleAnatomy.findMany({
            where: {
                name: { in: data.map((item) => item.name) },
            },
            select: { name: true },
        });

        const existingItems = new Set(existingRecords.map((record) => record.name));

        const newRecords = data
            .filter((item) => !existingItems.has(item.name))
            .map(({ name, image, distortion_type, muscleImbalanceName }) => ({
                name,
                image,
                distortion_type,
                muscleImbalanceId: muscleImbalance.find((muscle) => muscle.name === muscleImbalanceName)?.id,
            }));

        let result = [];
        if (newRecords.length > 0) {
            result = await prisma.muscleAnatomy.createMany({
                data: newRecords,
                skipDuplicates: true,
            });
        }
        if (result.length === 0) {
            result = await prisma.muscleAnatomy.findMany();
        }
        return result;
    } catch (error) {
        throw error;
    }
};

//! ---------------------------------------------------- NOT USED YET
const createMuscleAnatomyService = async (data) => {
    try {
        return await prisma.athlete.create({ data });
    } catch (error) {
        throw error;
    }
};

const updateMuscleAnatomyService = async ({ id, data }) => {
    try {
        return await prisma.muscleAnatomy.update({
            where: {
                id,
            },
            data,
        });
    } catch (error) {
        throw error;
    }
};
const getMuscleAnatomyByNamesService = async (muscleAnatomyByNames) => {
    try {
        return await prisma.athlete.findMany({
            where: {
                name: {
                    in: muscleAnatomyByNames ? muscleAnatomyByNames.split(',') : undefined,
                },
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    createMuscleAnatomyService,
    updateMuscleAnatomyService,
    getMuscleAnatomyByNamesService,
    muscleAnatomyJsonDBSetUpService,
};
