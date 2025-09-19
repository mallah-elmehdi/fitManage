import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { undefined, z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { MultiSelect } from '~/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { TEMPO } from '../../lib/enums';
import { INTENSITY } from '../../lib/enums';

const formSchema = z.object({
    set: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    repetition: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    tempo: z.enum(Object.keys(TEMPO) as [keyof typeof TEMPO]).optional(),
    rest: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    intensity: z.enum(Object.keys(INTENSITY) as [keyof typeof INTENSITY]).optional(),
});

type TrainingSessionFormFormValues = z.infer<typeof formSchema>;

function AddTrainingSessionForm() {
    const form = useForm<TrainingSessionFormFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            set: undefined,
            repetition: undefined,
            tempo: undefined,
            rest: undefined,
            intensity: undefined,
        },
    });

    function onSubmit(values: TrainingSessionFormFormValues) {
        // axios
        //     .post('http://localhost:9090/medical-and-health-history', {
        //         athleteId: parseInt(athleteId || '0'),
        //         ...values,
        //     })
        //     .then((res) => {
        //         toast.success(res.data.message);
        //         setTimeout(() => {
        //             document.location.reload();
        //         }, 1000);
        //     })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Exercise Format ID */}
                <FormField
                    control={form.control}
                    name="set"
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
                {/* Exercise Type */}
                <FormField
                    control={form.control}
                    name="exercise_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exercise Type</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(EXERCISE_TYPE).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Sets */}
                <FormField
                    control={form.control}
                    name="set"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sets</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Repetitions */}
                <FormField
                    control={form.control}
                    name="repetition"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repetitions</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tempo */}
                <FormField
                    control={form.control}
                    name="tempo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tempo</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select tempo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(TEMPO).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Rest */}
                <FormField
                    control={form.control}
                    name="rest"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rest (seconds)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Intensity */}
                <FormField
                    control={form.control}
                    name="intensity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Intensity</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select intensity" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(INTENSITY).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <Button type="submit">Save Exercise</Button>
            </form>
        </Form>
    );
}

export default AddTrainingSessionForm;
