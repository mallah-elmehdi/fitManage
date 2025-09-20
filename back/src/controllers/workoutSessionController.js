import { StatusCodes } from 'http-status-codes';
import exerciseTrainingService from '../services/exerciseTrainingService';
import macroCycleService from '../services/macroCycleService';
import mesoCycleService from '../services/mesoCycleService';
import microCycleService from '../services/microCycleService';
import workoutSessionService from '../services/workoutSessionService';
import { getMonthEnd, getMonthStart, getWeekEnd, getWeekStart, getYearEnd, getYearStart } from '../utils/func';

const { createWorkoutSessionService, getAllWorkoutsByAthleteIdService } = workoutSessionService;

const { getMicroCycleByStartDateService, createMicroCycleService } = microCycleService;
const { getMacroCycleByStartDateService, createMacroCycleService } = macroCycleService;
const { getMesoCycleByStartDateService, createMesoCycleService } = mesoCycleService;
const { createManyExercisesTrainingService } = exerciseTrainingService;

const createWorkoutSession = async (req, res, next) => {
    try {
        const startWeek = getWeekStart(req.body.date);
        const startMonth = getMonthStart(req.body.date);
        const startYear = getYearStart(req.body.date);
        let microCycle;

        microCycle = await getMicroCycleByStartDateService(startWeek);
        if (!microCycle) {
            let mesoCycle = await getMesoCycleByStartDateService(startMonth);

            if (!mesoCycle) {
                let macroCycle = await getMacroCycleByStartDateService(startYear);
                if (!macroCycle) {
                    macroCycle = await createMacroCycleService({
                        start_date: startYear,
                        end_date: getYearEnd(startYear),
                    });
                }
                mesoCycle = await createMesoCycleService({
                    start_date: startMonth,
                    end_date: getMonthEnd(startMonth),
                    macrocycleId: macroCycle.id,
                });
            }
            microCycle = await createMicroCycleService({
                start_date: startWeek,
                end_date: getWeekEnd(startWeek),
                mesocycleId: mesoCycle.id,
            });
        }

        const workoutSession = await createWorkoutSessionService({
            date: req.body.date,
            athleteId: req.body.athleteId,
            training_level: req.body.training_level,
            training_phase: req.body.training_phase,
            microcycleId: microCycle.id,
        });

        const newExercises = await createManyExercisesTrainingService(
            req.body.exercises.map((item) => ({
                workoutSessionId: workoutSession.id,
                exerciseFormatId: item.exercise_format.id,
                exercise_type: item.exercise_type,
                tempo: item.tempo,
                intensity: item.intensity,
                set: parseInt(item.set),
                repetition: parseInt(item.repetition),
                rest: parseInt(item.rest),
            }))
        );

        return res.status(StatusCodes.OK).json({
            message: 'Workout session created successfully',
            result: newExercises,
        });
    } catch (error) {
        return next(error);
    }
};

const getAllWorkoutsByAthleteId = async (req, res, next) => {
    try {
        const athletes = await getAllWorkoutsByAthleteIdService(parseInt(req.query.athleteId));

        return res.status(StatusCodes.OK).json({
            message: 'List of all workouts fetched successfully',
            result: athletes,
        });
    } catch (error) {
        return next(error);
    }
};

export default {
    createWorkoutSession,
    getAllWorkoutsByAthleteId,
};
