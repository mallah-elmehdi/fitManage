import {
    CHRONIC_DISEASE_TYPE,
    DISTORTION_TYPE,
    EQUIPMENT,
    EXERCISE_MECHANIC,
    EXERCISE_TYPE,
    FITNESS_LEVEL,
    GENDER,
    INJURY_TYPE,
    INTENSITY,
    MEDICATION_TYPE,
    MUSCLE,
    PLANE_OF_MOTION,
    POSTURE_DISTORTION,
    POSTURE_TYPE,
    SURGERY_TYPE,
    TEMPO,
    TRAINING_FOCUS,
    TRAINING_PHASE,
} from './enums';

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

export type AthleteType = {
    id: number;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    age?: number | null;
    height?: number | null;
    gender?: GENDER | null;

    physician_name?: string | null;
    physician_phone?: string | null;
    emergency_contact_name?: string | null;
    emergency_contact_phone?: string | null;

    medical_and_health_histories: MedicalAndHealthHistoryType[];
    assessments: AssessmentType[];

    WorkoutSessions: WorkoutSessionType[];

    // createdAt: Date;
    // updatedAt: Date;
};

// export type AssessmentType = {
//     id: number;
//     athleteId?: number | null;

//     // Basic Measures
//     weight?: number | null;
//     body_fat?: number | null;

//     // Vitals
//     resting_heart_rate?: number | null;
//     vo2_max?: number | null;
//     blood_pressure_systolic?: number | null;
//     blood_pressure_diastolic?: number | null;

//     // Movement Screening
//     static: STATIC_POSTURE_DISTORTION[];
//     overhead_squat: OVERHEAD_SQUAT_POSTURE_DISTORTION[];
//     pushing: PUSHING_PULLING_POSTURE_DISTORTION[];
//     pulling: PUSHING_PULLING_POSTURE_DISTORTION[];
//     single_leg_squat: SINGLE_SQUAT_POSTURE_DISTORTION[];

//     // Performance
//     push_up_1_minute_test?: number | null;
//     bench_press_one_rep_maximum_strength?: number | null;
//     vertical_jump_reach?: number | null;
//     long_jump_distance?: number | null;
//     lower_extremity_functional_duration?: number | null;
//     the_40_yard_dash_duration?: number | null;
//     pro_shuttle_duration?: number | null;

//     fitness_level: FITNESS_LEVEL;

//     createdAt: Date;
//     updatedAt: Date;
// };

export interface MuscleAnatomyType {
    id: number;
    name: string;
    image?: string;
    distortion_type?: DISTORTION_TYPE;
    createdAt: string; // ISO date string
    updatedAt: string;
    muscleImbalanceId?: number;
    MuscleImbalance?: MuscleImbalanceType; // optional relation
}

export interface MuscleImbalanceType {
    id: number;
    name: POSTURE_DISTORTION;
    posture_type: POSTURE_TYPE;
    image?: string;
    muscle_anatomy: MuscleAnatomyType[];
    exercises: ExerciseFormatType[];
    assessmentId?: number;
    Assessment?: AssessmentType;
    createdAt: string;
    updatedAt: string;
}

export type AssessmentMuscleImbalanceType = {
    assessmentId: number;
    muscleImbalanceId: number;
    createdAt: string; // or Date
    updatedAt: string; // or Date
    muscle_imbalance: MuscleImbalanceType;
    assessment: AssessmentType;
};

export type AssessmentType = {
    id: number;
    athleteId?: number;
    weight?: number;
    body_fat?: number;
    resting_heart_rate?: number;
    vo2_max?: number;
    blood_pressure_systolic?: number;
    blood_pressure_diastolic?: number;
    push_up_1_minute_test?: number;
    bench_press_one_rep_maximum_strength?: number;
    vertical_jump_reach?: number;
    long_jump_distance?: number;
    lower_extremity_functional_duration?: number;
    the_40_yard_dash_duration?: number;
    pro_shuttle_duration?: number;
    fitness_level: FITNESS_LEVEL;
    muscle_imbalances: AssessmentMuscleImbalanceType[];
    createdAt: string; // or Date
    updatedAt: string; // or Date
};

export type MedicalAndHealthHistoryType = {
    id: number;
    athleteId?: number | null;

    past_injuries: INJURY_TYPE[];
    past_surgeries: SURGERY_TYPE[];
    chronic_disease: CHRONIC_DISEASE_TYPE[];
    medications: MEDICATION_TYPE[];

    createdAt: Date;
    updatedAt: Date;
};

export type WorkoutSessionType = {
    id: number;
    date: Date;

    athleteId: number;
    athlete: AthleteType;
    microcycleId: number;
    microcycle: MicroCycleType;

    training_level: string; // or TrainingLevel enum if defined
    training_phase: string; // or TrainingPhase enum if defined

    exercises: ExerciseType[]; // replace with Exercise[] type when defined

    createdAt: Date;
    updatedAt: Date;
};

export type MacroCycleType = {
    id: number;
    start_date: string; // or Date
    end_date: string; // or Date
    mesocycles: MesoCycleType[];
    createdAt: string; // or Date
    updatedAt: string; // or Date
};

export type MesoCycleType = {
    id: number;
    start_date: string; // or Date
    end_date: string; // or Date
    macrocycleId: number;
    macrocycle: MacroCycleType;
    microcycles: MicroCycleType[];
    createdAt: string; // or Date
    updatedAt: string; // or Date
};

export type MicroCycleType = {
    id: number;
    start_date: string; // or Date
    end_date: string; // or Date
    mesocycleId: number;
    mesocycle: MesoCycleType;
    workoutSessions: WorkoutSessionType[]; // define WorkoutSessionType separately
    createdAt: string; // or Date
    updatedAt: string; // or Date
};

export type ExerciseType = {
    id: number;
    exercise_format: ExerciseFormatType; // You'll need to define/import this type
    exerciseFormatId: number;

    exercise_type: EXERCISE_TYPE; // Define/import this enum or type too

    set?: number;
    repetition?: number;
    tempo?: TEMPO; // Same here
    rest: number; // in seconds
    intensity?: INTENSITY; // And here

    WorkoutSession?: WorkoutSessionType; // Define/import type
    workoutSessionId?: number;

    createdAt: Date; // Dates usually come as ISO Dates in JSON
    updatedAt: Date;
};

export type APIResponseType<T> = {
    message: string;
    result: T;
};
