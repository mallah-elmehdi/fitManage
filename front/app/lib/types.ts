import { EQUIPMENT, EXERCISE_MECHANIC, FITNESS_LEVEL, MUSCLE, PLANE_OF_MOTION, TRAINING_FOCUS, TRAINING_PHASE } from './enums';

// // Now the ExerciseFormat type
export interface ExerciseFormatType {
    id: number;
    name: string;
    equipment?: EQUIPMENT;
    exercise_mechanic?: EXERCISE_MECHANIC;
    plane_of_motion?: PLANE_OF_MOTION;
    primary_muscles: MUSCLE[];
    secondary_muscles: MUSCLE[];
    stabilizer_muscles: MUSCLE[];
    appropriate_training_phases: TRAINING_PHASE[];
    appropriate_fitness_level?: FITNESS_LEVEL;
    focus?: TRAINING_FOCUS;
    images: string[];
    instructions: string[];
    video?: string;
    createdAt: string; // ISO string from backend
    updatedAt: string;
}
