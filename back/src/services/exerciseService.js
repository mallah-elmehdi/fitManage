import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const dbJson = path.join(__dirname, '../utils/exercises.json');

// helpers
const equipmentMapping = {
    'medicine ball': 'MEDICINE_BALL',
    dumbbell: 'DUMBBELL',
    'body only': 'BODYWEIGHT',
    bands: 'RESISTANCE_BAND',
    kettlebells: 'KETTLEBELL',
    'foam roll': 'FOAM_ROLLER',
    cable: 'CABLE_MACHINE',
    machine: 'RESISTANCE_MACHINE',
    barbell: 'BARBELL',
    'exercise ball': 'STABILITY_BALL',
    'e-z curl bar': 'EZ_BAR',
    other: 'OTHER',
};

const mechanicMapping = {
    isolation: 'ISOLATION',
    compound: 'COMPOUND',
};

const levelMapping = {
    beginner: 'DECONDITIONED',
    intermediate: 'INTERMEDIATE',
    expert: 'ADVANCED',
};

const muscleMapping = {
    abdominals: 'ABDOMINALS',
    abductors: 'ABDUCTORS',
    adductors: 'ADDUCTORS',
    biceps: 'BICEPS',
    calves: 'CALVES',
    chest: 'CHEST', // could also split into UPPER_CHEST & LOWER_CHEST
    forearms: 'FOREARMS',
    glutes: 'GLUTES',
    hamstrings: 'HAMSTRINGS',
    lats: 'LATS',
    'lower back': 'ERECTOR_SPINAE',
    'middle back': 'RHOMBOIDS', // mapped to mid-back muscles
    neck: 'NECK_FLEXORS', // could also map to NECK_EXTENSORS
    quadriceps: 'QUADRICEPS',
    shoulders: 'FRONT_DELTS', // also SIDE_DELTS, REAR_DELTS
    traps: 'TRAPS',
    triceps: 'TRICEPS',

    // Extra enum values not in keys
    'upper chest': 'UPPER_CHEST',
    'lower chest': 'LOWER_CHEST',
    'rear delts': 'REAR_DELTS',
    'front delts': 'FRONT_DELTS',
    'side delts': 'SIDE_DELTS',
    obliques: 'OBLIQUES',
    'transverse abs': 'TRANSVERSE_ABS',
    'tibialis anterior': 'TIBIALIS_ANTERIOR',
    'neck extensors': 'NECK_EXTENSORS',
};
const focusMapping = {
    powerlifting: 'RESISTANCE',
    strength: 'RESISTANCE',
    stretching: 'FLEXIBILITY',
    cardio: 'CARDIO',
    'olympic weightlifting': 'RESISTANCE',
    strongman: 'RESISTANCE',
    plyometrics: 'PLYOMETRIC',
};
const phaseMapping = {
    powerlifting: ['HYPERTROPHY', 'MAXIMAL_STRENGTH', 'POWER'], // accessory → hypertrophy, main lifts → max strength, explosive variants → power
    strength: ['STRENGTH_ENDURANCE', 'HYPERTROPHY', 'MAXIMAL_STRENGTH'],
    stretching: ['STABILIZATION_ENDURANCE'], // mostly mobility & stability
    cardio: ['STABILIZATION_ENDURANCE', 'STRENGTH_ENDURANCE'], // endurance, conditioning
    'olympic weightlifting': ['POWER', 'STRENGTH_ENDURANCE'], // explosive + strength prep
    strongman: ['HYPERTROPHY', 'STRENGTH_ENDURANCE', 'MAXIMAL_STRENGTH'],
    plyometrics: ['POWER', 'STABILIZATION_ENDURANCE'],
};

const exerciseJsonDBSetUpService = async () => {
    try {
        const data = JSON.parse(fs.readFileSync(dbJson));

        const existingRecords = await prisma.exerciseFormat.findMany({
            where: {
                name: { in: data.map((item) => item.name) },
            },
            select: { name: true },
        });

        const existingItems = new Set(existingRecords.map((record) => record.name));

        const newRecords = data
            .filter((item) => !existingItems.has(item.name))
            .map(({ name, force, level, mechanic, equipment, primaryMuscles, secondaryMuscles, instructions, category, images }) => ({
                name,
                instructions,
                images,
                equipment: equipmentMapping[equipment],
                exercise_mechanic: mechanicMapping[mechanic],
                appropriate_fitness_level: levelMapping[level],
                appropriate_training_phases: phaseMapping[category],
                focus: focusMapping[category],
                primary_muscles: primaryMuscles.map((mus) => {
                    return muscleMapping[mus];
                }),
                secondary_muscles: secondaryMuscles.map((mus) => {
                    return muscleMapping[mus];
                }),
            }));

        if (newRecords.length > 0) {
            await prisma.exerciseFormat.createMany({
                data: newRecords,
                skipDuplicates: true, // Optional: if your unique constraint might still cause issues
            });
        }
    } catch (error) {
        throw error;
    }
};

const getAllExercisesWithPaginationService = async ({
    page,
    name,
    fitness_level,
    training_phases,
    primary_muscles,
    secondary_muscles,
    focus,
}) => {
    try {
        const pageSize = 20;
        const skip = (page - 1) * pageSize;
        const whereClause = {
            name: {
                contains: name || '',
                mode: 'insensitive',
            },
            appropriate_fitness_level: fitness_level || undefined,
            focus: focus || undefined,
            appropriate_training_phases: training_phases
                ? {
                      hasEvery: training_phases.split(','),
                  }
                : undefined,
            primary_muscles: primary_muscles
                ? {
                      hasEvery: primary_muscles.split(','),
                  }
                : undefined,
            secondary_muscles: secondary_muscles
                ? {
                      hasEvery: secondary_muscles.split(','),
                  }
                : undefined,
        };

        const exercises = await prisma.exerciseFormat.findMany({
            skip,
            take: pageSize,
            where: whereClause,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalExercises = await prisma.exerciseFormat.count({
            where: whereClause,
        });

        console.log('totalExercises', totalExercises);

        return {
            totalExercises,
            exercises,
            currentPage: page,
            totalPages: Math.ceil(totalExercises / pageSize),
        };
    } catch (error) {}
};

export default {
    exerciseJsonDBSetUpService,
    getAllExercisesWithPaginationService,
};
