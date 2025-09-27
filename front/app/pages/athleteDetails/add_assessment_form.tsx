// @ts-nocheck
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { MultiSelect } from '~/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { createAssessment } from '~/context/api/assessmentApi';
import { getAllMuscleImbalances } from '~/context/api/muscleImbalanceApi';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import {
    FITNESS_LEVEL,
    OVERHEAD_SQUAT_POSTURE_DISTORTION,
    POSTURE_TYPE,
    PUSHING_PULLING_POSTURE_DISTORTION,
    SINGLE_SQUAT_POSTURE_DISTORTION,
    STATIC_POSTURE_DISTORTION,
} from '~/lib/enums';

const assessmentSchema = z.object({
    // Basic measures
    weight: z.number().min(0).optional(),
    body_fat: z.number().min(0).optional(),

    // Vitals
    resting_heart_rate: z.number().min(0).optional(),
    vo2_max: z.number().min(0).optional(),
    blood_pressure_systolic: z.number().min(0).optional(),
    blood_pressure_diastolic: z.number().min(0).optional(),

    // Movement Screening (arrays of enums)
    static: z.array(z.enum(Object.keys(STATIC_POSTURE_DISTORTION) as [keyof typeof STATIC_POSTURE_DISTORTION])),
    overhead_squat: z.array(z.enum(Object.keys(OVERHEAD_SQUAT_POSTURE_DISTORTION) as [keyof typeof OVERHEAD_SQUAT_POSTURE_DISTORTION])),
    pushing: z.array(z.enum(Object.keys(PUSHING_PULLING_POSTURE_DISTORTION) as [keyof typeof PUSHING_PULLING_POSTURE_DISTORTION])),
    pulling: z.array(z.enum(Object.keys(PUSHING_PULLING_POSTURE_DISTORTION) as [keyof typeof PUSHING_PULLING_POSTURE_DISTORTION])),
    single_leg_squat: z.array(z.enum(Object.keys(SINGLE_SQUAT_POSTURE_DISTORTION) as [keyof typeof SINGLE_SQUAT_POSTURE_DISTORTION])),

    // Performance
    push_up_1_minute_test: z.number().min(0).optional(),
    bench_press_one_rep_maximum_strength: z.number().min(0).optional(),
    vertical_jump_reach: z.number().min(0).optional(),
    long_jump_distance: z.number().min(0).optional(),
    lower_extremity_functional_duration: z.number().min(0).optional(),
    the_40_yard_dash_duration: z.number().min(0).optional(),
    pro_shuttle_duration: z.number().min(0).optional(),

    // Fitness level
    fitness_level: z.enum(Object.keys(FITNESS_LEVEL) as [keyof typeof FITNESS_LEVEL]),
    // --------
    athleteId: z.number().optional(),
});

export type AssessmentFormValues = z.infer<typeof assessmentSchema>;

function AddAssessmentForm({ handleDialogClose }: { handleDialogClose: () => void }) {
    const dispatch = useAppDispatch();
    const { athleteId } = useParams();
    const { muscle_imbalances } = useAppSelector((state) => state.muscleImbalance);

    useEffect(() => {
        if (muscle_imbalances.length === 0) {
            dispatch(getAllMuscleImbalances())
                .unwrap()
                .catch((error) => {
                    toast.error(error?.message || 'Failed to fetch');
                });
        }
    }, [dispatch]);

    // console.log('muscle_imbalances', muscle_imbalances);

    const form = useForm<AssessmentFormValues>({
        resolver: zodResolver(assessmentSchema),
        defaultValues: {
            weight: undefined,
            body_fat: undefined,
            resting_heart_rate: undefined,
            vo2_max: undefined,
            blood_pressure_systolic: undefined,
            blood_pressure_diastolic: undefined,
            // --
            static: [],
            overhead_squat: [],
            pushing: [],
            pulling: [],
            single_leg_squat: [],
            // --
            push_up_1_minute_test: undefined,
            bench_press_one_rep_maximum_strength: undefined,
            vertical_jump_reach: undefined,
            long_jump_distance: undefined,
            lower_extremity_functional_duration: undefined,
            the_40_yard_dash_duration: undefined,
            pro_shuttle_duration: undefined,
            fitness_level: undefined,
        },
    });

    function onSubmit(values: AssessmentFormValues) {
        const _static = muscle_imbalances.filter((muscle) => muscle.posture_type === POSTURE_TYPE.STATIC);
        const overhead_squat = muscle_imbalances.filter((muscle) => muscle.posture_type === POSTURE_TYPE.OVERHEAD_SQUAT);
        const pushing = muscle_imbalances.filter((muscle) => muscle.posture_type === POSTURE_TYPE.PUSHING);
        const pulling = muscle_imbalances.filter((muscle) => muscle.posture_type === POSTURE_TYPE.PULLING);
        const single_leg_squat = muscle_imbalances.filter((muscle) => muscle.posture_type === POSTURE_TYPE.SINGLE_SQUAT);

        const data = {
            // -------------- Basic Measures
            weight: values.weight,
            body_fat: values.body_fat,
            resting_heart_rate: values.resting_heart_rate,
            vo2_max: values.vo2_max,
            blood_pressure_systolic: values.blood_pressure_systolic,
            blood_pressure_diastolic: values.blood_pressure_diastolic,
            // -------------  Performance (Optional)
            push_up_1_minute_test: values.push_up_1_minute_test,
            bench_press_one_rep_maximum_strength: values.bench_press_one_rep_maximum_strength,
            vertical_jump_reach: values.vertical_jump_reach,
            long_jump_distance: values.long_jump_distance,
            lower_extremity_functional_duration: values.lower_extremity_functional_duration,
            the_40_yard_dash_duration: values.the_40_yard_dash_duration,
            pro_shuttle_duration: values.pro_shuttle_duration,

            muscle_imbalances: [
                _static.filter((item) => values.static.includes(item.name)),
                overhead_squat.filter((item) => values.overhead_squat.includes(item.name)),
                pushing.filter((item) => values.pushing.includes(item.name)),
                pulling.filter((item) => values.pulling.includes(item.name)),
                single_leg_squat.filter((item) => values.single_leg_squat.includes(item.name)),
            ]
                .flat(Infinity)
                .map((m_item) => m_item.id),

            // ------------ Fitness level classification
            fitness_level: values.fitness_level,
            athleteId: parseInt(athleteId || '-1'),
        };

        // console.log('AddAssessmentForm data', data);

        dispatch(
            createAssessment({
                data,
                athleteId: athleteId || '',
            })
        )
            .unwrap()
            .then((result) => {
                // handleDialogClose();
                toast.success(result.message);
            })
            .catch((error) => {
                toast.error(error?.message || 'Failed to create athlete');
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* basic */}
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter weight"
                                    {...field}
                                    type="number"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="body_fat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Body Fat (%)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter body fat"
                                    {...field}
                                    type="number"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="resting_heart_rate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resting Heart Rate</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter resting heart rate"
                                    {...field}
                                    type="number"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vo2_max"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>VO2 max</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter vo2 max"
                                    {...field}
                                    type="number"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="blood_pressure_systolic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blood Pressure Systolic</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter blood pressure systolic"
                                    {...field}
                                    type="number"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="blood_pressure_diastolic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blood Pressure Diastolic</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter blood pressure diastolic"
                                    {...field}
                                    type="number"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Movement Screening (checkboxes or multi-select) */}
                <FormField
                    control={form.control}
                    name="static"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Static Posture Distortions</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    hideSelectAll
                                    options={Object.entries(STATIC_POSTURE_DISTORTION).map(([value, label]) => ({
                                        label,
                                        value,
                                    }))}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Choose one or multiple..."
                                    variant="inverted"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="overhead_squat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Over head Squat Posture Distortions</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    hideSelectAll
                                    options={Object.entries(OVERHEAD_SQUAT_POSTURE_DISTORTION).map(([value, label]) => ({
                                        label,
                                        value,
                                    }))}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Choose one or multiple..."
                                    variant="inverted"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pushing"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pushing Posture Distortions</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    hideSelectAll
                                    options={Object.entries(PUSHING_PULLING_POSTURE_DISTORTION).map(([value, label]) => ({
                                        label,
                                        value,
                                    }))}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Choose one or multiple..."
                                    variant="inverted"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pulling"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pulling Posture Distortions</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    hideSelectAll
                                    options={Object.entries(PUSHING_PULLING_POSTURE_DISTORTION).map(([value, label]) => ({
                                        label,
                                        value,
                                    }))}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Choose one or multiple..."
                                    variant="inverted"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="single_leg_squat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Single Squat Distortions</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    hideSelectAll
                                    options={Object.entries(SINGLE_SQUAT_POSTURE_DISTORTION).map(([value, label]) => ({
                                        label,
                                        value,
                                    }))}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Choose one or multiple..."
                                    variant="inverted"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* performance */}
                {/* <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter weight" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                {/* Fitness level */}
                <FormField
                    control={form.control}
                    name="fitness_level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fitness Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose fitness level" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(FITNESS_LEVEL).map(([key, val]) => (
                                        <SelectItem key={key} value={key}>
                                            {val}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default AddAssessmentForm;
