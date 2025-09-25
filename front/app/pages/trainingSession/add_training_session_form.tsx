import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { cn } from '~/lib/utils';
import { TRAINING_PHASE } from '../../lib/enums';
import { TrainingSessionType } from './add_training_session_exercise_form';

const formSchema = z.object({
    date: z.date(),
    training_phase: z.enum(Object.keys(TRAINING_PHASE) as [keyof typeof TRAINING_PHASE]),
});

type formValues = z.infer<typeof formSchema>;

function AddTrainingSessionForm({ exercises }: { exercises: TrainingSessionType[] }) {
    const { athleteId } = useParams();

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: undefined,
            training_phase: undefined,
        },
    });

    function onSubmit(values: formValues) {
        axios
            .post('http://localhost:9090/workout-session', {
                athleteId: parseInt(athleteId || '0'),
                exercises,
                training_level:
                    TRAINING_PHASE[values.training_phase] === TRAINING_PHASE.STABILIZATION_ENDURANCE
                        ? 'STABILIZATION'
                        : TRAINING_PHASE[values.training_phase] === TRAINING_PHASE.POWER
                          ? 'POWER'
                          : 'STRENGTH',
                ...values,
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
        <div className="space-y-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of the session</FormLabel>
                                <Popover>
                                    {/* ------ */}
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                                            >
                                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>

                                    {/* ------ */}
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date()}
                                            captionLayout="dropdown"
                                            fromYear={new Date().getFullYear()}
                                            toYear={new Date().getFullYear() + 10}
                                            weekStartsOn={1}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="training_phase"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Training phase</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choose..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.entries(TRAINING_PHASE).map(([key, val]) => (
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

                    {/* {exercises?.map((exercise) => (
                        <Card>
                            <CardContent>
                                <TypographyP className="text-sm font-bold">{EXERCISE_TYPE[exercise.exercise_type]}</TypographyP>
                                <TypographyP className="text-sm font-semibold">{exercise.exercise_format.name}</TypographyP>
                                <TypographyP className="text-sm">set: {exercise.set}</TypographyP>
                                <TypographyP className="text-sm">repetition: {exercise.repetition}</TypographyP>
                                <TypographyP className="text-sm">rest: {exercise.rest}</TypographyP>
                                <TypographyP className="text-sm">tempo: {TEMPO[exercise.tempo]}</TypographyP>
                                <TypographyP className="text-sm">intensity: {INTENSITY[exercise.intensity]}</TypographyP>
                            </CardContent>
                        </Card>
                    ))} */}
                    {/* ---------- */}

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}

export default AddTrainingSessionForm;
