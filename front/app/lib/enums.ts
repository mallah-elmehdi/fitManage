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

export enum EXERCISE_TYPE {
    WORM_UP = 'Worm up',
    ACTIVATION = 'Activation',
    SKILL_DEVELOPMENT = 'Skill development',
    RESISTANCE = 'Resistance',
    COOL_DOWN = 'Cool down',
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

// // ✅ Static Posture Distortion
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

export enum POSTURE_DISTORTION {
    PES_PLANUS_DISTORTION = 'Pes Planus Distortion (Flat Feet)',
    LOWER_CROSSED = 'Lower Crossed Syndrome',
    UPPER_CROSSED = 'Upper Crossed Syndrome',
    LOW_BACK_ARCHES = 'Low Back Arches',
    SHOULDERS_ELEVATE = 'Shoulders Elevate',
    HEAD_JUTS_FORWARD = 'Head Juts Forward',
    FEET_TURN_OUT = 'Feet Turn Out',
    KNEES_CAVE_IN = 'Knees Cave In',
    FORWARD_LEAN = 'Forward Lean',
    ARMS_FALL_FORWARD = 'Arms Fall Forward',
    KNEE_CAVES_INWARD = 'Knee Caves Inward',
}

export enum POSTURE_TYPE {
    STATIC = 'STATIC',
    PUSHING = 'PUSHING',
    PULLING = 'PULLING',
    OVERHEAD_SQUAT = 'OVERHEAD_SQUAT',
    SINGLE_SQUAT = 'SINGLE_SQUAT',
}

export enum DISTORTION_TYPE {
    OVERACTIVE = 'overactive',
    UNDERACTIVE = 'underactive',
}

// ✅ Degree Level
export enum DEGREE_LEVEL {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

export enum INJURY_TYPE {
    ANKLE_SPRAIN = 'Ankle sprain',
    KNEE_INJURY = 'Knee injury',
    HIP_INJURY = 'Hip injury',
    SHOULDER_INJURY = 'Shoulder injury',
    ELBOW_INJURY = 'Elbow injury',
    WRIST_INJURY = 'Wrist injury',
    LOWER_BACK_PAIN = 'Lower back pain',
    NECK_PAIN = 'Neck pain',
    OTHER = 'Other',
}

export enum SURGERY_TYPE {
    ACL_RECONSTRUCTION = 'Acl reconstruction',
    MENISCUS_REPAIR = 'Meniscus repair',
    SHOULDER_LABRUM = 'Shoulder labrum',
    ROTATOR_CUFF = 'Rotator cuff',
    SPINAL_SURGERY = 'Spinal surgery',
    HIP_REPLACEMENT = 'Hip replacement',
    KNEE_REPLACEMENT = 'Knee replacement',
    CARDIAC_SURGERY = 'Cardiac surgery',
    OTHER = 'Other',
}

export enum CHRONIC_DISEASE_TYPE {
    DIABETES = 'Diabetes',
    HYPERTENSION = 'Hypertension',
    ASTHMA = 'Asthma',
    CARDIOVASCULAR_DISEASE = 'Cardiovascular disease',
    ARTHRITIS = 'Arthritis',
    OSTEOPOROSIS = 'Osteoporosis',
    OBESITY = 'Obesity',
    CANCER = 'Cancer',
    OTHER = 'Other',
}

export enum MEDICATION_TYPE {
    BLOOD_PRESSURE_MEDICATION = 'Blood pressure medication',
    DIABETES_MEDICATION = 'Diabetes medication',
    CHOLESTEROL_MEDICATION = 'Cholesterol medication',
    ASTHMA_INHALER = 'Asthma inhaler',
    PAIN_RELIEVERS = 'Pain relievers',
    ANTI_DEPRESSANTS = 'Anti depressants',
    ANTI_INFLAMMATORY = 'Anti inflammatory',
    OTHER = 'Other',
}

// Exercise mechanic (movement type)
export enum EXERCISE_MECHANIC {
    COMPOUND = 'Compound', // Multi-joint, multiple muscle groups
    ISOLATION = 'Isolation', // Single-joint, focused
}

// Plane of motion
export enum PLANE_OF_MOTION {
    SAGITTAL = 'Sagittal',
    FRONTAL = 'Frontal',
    TRANSVERSE = 'Transverse',
    MULTIPLANAR = 'Multiplanar',
}

// Equipment
export enum EQUIPMENT {
    DUMBBELL = 'Dumbbell',
    BARBELL = 'Barbell',
    KETTLEBELL = 'Kettlebell',
    CABLE_MACHINE = 'Cable machine',
    RESISTANCE_MACHINE = 'Resistance machine',
    RESISTANCE_BAND = 'Resistance band',
    MEDICINE_BALL = 'Medicine ball',
    STABILITY_BALL = 'Stability ball',
    BOSU_BALL = 'BOSU ball',
    TRX_SUSPENSION = 'TRX suspension',
    SANDBAG = 'Sandbag',
    PLATE = 'Plate',
    EZ_BAR = 'E-Z bar',
    BODYWEIGHT = 'Bodyweight',
    FOAM_ROLLER = 'Foam roller',
    OTHER = 'Other',
}

export enum MUSCLE {
    // --- Upper Body
    CHEST = 'Chest',
    UPPER_CHEST = 'Upper chest',
    LOWER_CHEST = 'Lower chest',
    BACK = 'Back',
    LATS = 'Lats',
    TRAPS = 'Traps',
    RHOMBOIDS = 'Rhomboids',
    SHOULDERS = 'Shoulders',
    REAR_DELTS = 'Rear delts',
    FRONT_DELTS = 'Front delts',
    SIDE_DELTS = 'Side delts',
    BICEPS = 'Biceps',
    TRICEPS = 'Triceps',
    FOREARMS = 'Forearms',

    // --- Core
    ABDOMINALS = 'Abdominals',
    OBLIQUES = 'Obliques',
    TRANSVERSE_ABS = 'Transverse abdominis',
    ERECTOR_SPINAE = 'Erector spinae',

    // --- Lower Body
    GLUTES = 'Glutes',
    QUADRICEPS = 'Quadriceps',
    HAMSTRINGS = 'Hamstrings',
    ADDUCTORS = 'Adductors',
    ABDUCTORS = 'Abductors',
    CALVES = 'Calves',
    TIBIALIS_ANTERIOR = 'Tibialis anterior',

    // --- Neck
    NECK_FLEXORS = 'Neck flexors',
    NECK_EXTENSORS = 'Neck extensors',
}
