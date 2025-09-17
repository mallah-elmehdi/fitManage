// ✅ Gender
export enum GENDER {
    MALE = 'Male',
    FEMALE = 'Female',
}

// ✅ Training Level
export enum TRAINING_LEVEL {
    STABILIZATION = 'Stabilization (Level 1)',
    STRENGTH = 'Strength (Level 2)',
    POWER = 'Power (Level 3)',
}

// ✅ Training Phase
export enum TRAINING_PHASE {
    STABILIZATION_ENDURANCE = 'Phase 1 - Stabilization Endurance',
    STRENGTH_ENDURANCE = 'Phase 2 - Strength Endurance',
    HYPERTROPHY = 'Phase 3 - Hypertrophy',
    MAXIMAL_STRENGTH = 'Phase 4 - Maximal Strength',
    POWER = 'Phase 5 - Power',
}

// ✅ Training Focus
export enum TRAINING_FOCUS {
    FLEXIBILITY = 'Flexibility',
    CARDIO = 'Cardio',
    CORE = 'Core',
    BALANCE = 'Balance',
    PLYOMETRIC = 'Plyometric',
    SAQ = 'Speed, Agility, Quickness (SAQ)',
    RESISTANCE = 'Resistance',
}

// ✅ Fitness Level
export enum FITNESS_LEVEL {
    DECONDITIONED = 'Deconditioned',
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced',
    ELITE = 'Elite',
}

// ✅ Tempo
export enum TEMPO {
    SLOW = 'Slow (4-2-1-0)',
    MODERATE = 'Moderate (2-0-2-0)',
    FAST = 'Fast (1-0-1-0)',
    CONTROLLED = 'Controlled (Strict Form)',
    EXPLOSIVE = 'Explosive (0-0-X-0)',
}

// ✅ Intensity
export enum INTENSITY {
    VERY_LOW = 'Very Low (~40% effort - recovery/mobility)',
    LOW = 'Low (~40-60% effort)',
    MODERATE = 'Moderate (~60-75% effort)',
    HIGH = 'High (~75-90% effort)',
    MAXIMAL = 'Maximal (~90-100% effort)',
}

// ✅ Training Goal
export enum TRAINING_GOAL {
    FAT_LOSS = 'Fat Loss',
    HYPERTROPHY = 'Hypertrophy',
    PERFORMANCE = 'Performance',
    OVER_ALL_HEALTH = 'Overall Health',
}

// ✅ Static Posture Distortion
export enum STATIC_POSTURE_DISTORTION {
    PES_PLANUS_DISTORTION = 'Pes Planus Distortion (Flat Feet)',
    LOWER_CROSSED = 'Lower Crossed Syndrome',
    UPPER_CROSSED = 'Upper Crossed Syndrome',
}

// ✅ Pushing / Pulling Posture Distortion
export enum PUSHING_PULLING_POSTURE_DISTORTION {
    LOW_BACK_ARCHES = 'Low Back Arches',
    SHOULDERS_ELEVATE = 'Shoulders Elevate',
    HEAD_JUTS_FORWARD = 'Head Juts Forward',
}

// ✅ Overhead Squat Posture Distortion
export enum OVERHEAD_SQUAT_POSTURE_DISTORTION {
    FEET_TURN_OUT = 'Feet Turn Out',
    KNEES_CAVE_IN = 'Knees Cave In',
    FORWARD_LEAN = 'Forward Lean',
    LOW_BACK_ARCHES = 'Low Back Arches',
    ARMS_FALL_FORWARD = 'Arms Fall Forward',
}

// ✅ Single Leg Squat Posture Distortion
export enum SINGLE_SQUAT_POSTURE_DISTORTION {
    KNEE_CAVES_INWARD = 'Knee Caves Inward',
}

// ✅ Degree Level
export enum DEGREE_LEVEL {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}
