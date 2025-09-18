import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { MultiSelect } from '~/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import {
    FITNESS_LEVEL,
    OVERHEAD_SQUAT_POSTURE_DISTORTION,
    PUSHING_PULLING_POSTURE_DISTORTION,
    SINGLE_SQUAT_POSTURE_DISTORTION,
    STATIC_POSTURE_DISTORTION,
} from '~/lib/enums';

const assessmentSchema = z.object({
    // Basic measures
    weight: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    body_fat: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),

    // Vitals
    resting_heart_rate: z.string().regex(/^\d+$/, { message: 'Must be a number' }).optional(),
    vo2_max: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    blood_pressure_systolic: z.string().regex(/^\d+$/, { message: 'Must be a number' }).optional(),
    blood_pressure_diastolic: z.string().regex(/^\d+$/, { message: 'Must be a number' }).optional(),

    // Movement Screening (arrays of enums)
    static: z.array(z.enum(Object.keys(STATIC_POSTURE_DISTORTION) as [keyof typeof STATIC_POSTURE_DISTORTION])),
    overhead_squat: z.array(z.enum(Object.keys(OVERHEAD_SQUAT_POSTURE_DISTORTION) as [keyof typeof OVERHEAD_SQUAT_POSTURE_DISTORTION])),
    pushing: z.array(z.enum(Object.keys(PUSHING_PULLING_POSTURE_DISTORTION) as [keyof typeof PUSHING_PULLING_POSTURE_DISTORTION])),
    pulling: z.array(z.enum(Object.keys(PUSHING_PULLING_POSTURE_DISTORTION) as [keyof typeof PUSHING_PULLING_POSTURE_DISTORTION])),
    single_leg_squat: z.array(z.enum(Object.keys(SINGLE_SQUAT_POSTURE_DISTORTION) as [keyof typeof SINGLE_SQUAT_POSTURE_DISTORTION])),

    // Performance
    push_up_1_minute_test: z.string().regex(/^\d+$/, { message: 'Must be a number' }).optional(),
    bench_press_one_rep_maximum_strength: z.string().regex(/^\d+$/, { message: 'Must be a number' }).optional(),
    vertical_jump_reach: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    long_jump_distance: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    lower_extremity_functional_duration: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    the_40_yard_dash_duration: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    pro_shuttle_duration: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),

    // Fitness level
    fitness_level: z.enum(Object.keys(FITNESS_LEVEL) as [keyof typeof FITNESS_LEVEL]),
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

function AddAssessmentForm() {
    const { athleteId } = useParams();

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
        axios
            .post('http://localhost:9090/assessment', {
                athleteId: parseInt(athleteId || '0'),
                ...values,
                // Convert strings -> numbers
                // --
                weight: values.weight ? parseFloat(values.weight) : null,
                body_fat: values.body_fat ? parseFloat(values.body_fat) : null,
                resting_heart_rate: values.resting_heart_rate ? parseInt(values.resting_heart_rate) : null,
                vo2_max: values.vo2_max ? parseFloat(values.vo2_max) : null,
                blood_pressure_systolic: values.blood_pressure_systolic ? parseInt(values.blood_pressure_systolic) : null,
                blood_pressure_diastolic: values.blood_pressure_diastolic ? parseInt(values.blood_pressure_diastolic) : null,
                // --
                push_up_1_minute_test: values.push_up_1_minute_test ? parseInt(values.push_up_1_minute_test) : null,
                bench_press_one_rep_maximum_strength: values.bench_press_one_rep_maximum_strength
                    ? parseFloat(values.bench_press_one_rep_maximum_strength)
                    : null,
                vertical_jump_reach: values.vertical_jump_reach ? parseFloat(values.vertical_jump_reach) : null,
                long_jump_distance: values.long_jump_distance ? parseFloat(values.long_jump_distance) : null,
                lower_extremity_functional_duration: values.lower_extremity_functional_duration
                    ? parseFloat(values.lower_extremity_functional_duration)
                    : null,
                the_40_yard_dash_duration: values.the_40_yard_dash_duration ? parseFloat(values.the_40_yard_dash_duration) : null,
                pro_shuttle_duration: values.pro_shuttle_duration ? parseFloat(values.pro_shuttle_duration) : null,
            })
            .then((res) => {
                toast.success(res.data.message);
                setTimeout(() => {
                    document.location.reload();
                }, 1000);
            })
            .catch((err) => toast.error(err.message));
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
                                <Input placeholder="Enter weight" {...field} />
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
                                <Input placeholder="Enter body fat" {...field} />
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
                                <Input placeholder="Enter resting heart rate" {...field} />
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
                                <Input placeholder="Enter vo2 max" {...field} />
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
                                <Input placeholder="Enter blood pressure systolic" {...field} />
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
                                <Input placeholder="Enter blood pressure diastolic" {...field} />
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
