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
import { STATIC_POSTURE_DISTORTION, TEMPO, TRAINING_LEVEL, TRAINING_PHASE } from '../../lib/enums';
import { INTENSITY } from '../../lib/enums';
import { useEffect, useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { ChevronsUpDown, Search } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { AllExercisesDataType } from '../exercises/exercises-list';

// date DateTime
// athlete   Athlete @relation(fields: [athleteId], references: [id])
// athleteId Int
// microcycle   Microcycle @relation(fields: [microcycleId], references: [id])
// microcycleId Int

// training_level TrainingLevel?
// training_phase TrainingPhase?
// exercises Exercise[]

const formSchema = z.object({
    exercises: z.array(z.string()),
    training_level: z.enum(Object.keys(TRAINING_LEVEL) as [keyof typeof TRAINING_LEVEL]),
    training_phase: z.enum(Object.keys(TRAINING_PHASE) as [keyof typeof TRAINING_PHASE]),
});

type formValues = z.infer<typeof formSchema>;

function AddTrainingSessionForm() {
    const { athleteId } = useParams();
    const [data, setData] = useState<AllExercisesDataType | undefined>(undefined);

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            exercises: [],
            training_level: undefined,
            training_phase: undefined,
        },
    });

    const getAllExercises = (search?: string) => {
        axios
            .get(`http://localhost:9090/exercise/all?page=1&name=${search}`)
            .then((results) => {
                setData(results.data.result);
                toast.success(results.data.message);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {});
    };

    function onSubmit(values: formValues) {
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

    // ------ this is to include in the multiselect
    const SearchButton = ({ search, setSearch }: { search?: string; setSearch: (search: string) => void }) => {
        return (
            <Button
                size="icon"
                onClick={() => {
                    getAllExercises(search);
                    setSearch('');
                }}
            >
                <Search />
            </Button>
        );
    };

    console.log('data', data);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* basic */}
                <FormField
                    control={form.control}
                    name="training_level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fitness Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(TRAINING_LEVEL).map(([key, val]) => (
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
                <FormField
                    control={form.control}
                    name="training_phase"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fitness Level</FormLabel>
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

                <FormField
                    control={form.control}
                    name="exercises"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Static Posture Distortions</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    options={
                                        data
                                            ? data.exercises.map((item) => ({ label: item.name, value: item.id + '' }))
                                            : [{ label: 'aa', value: 'ss' }]
                                    }
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Choose one or multiple..."
                                    variant="inverted"
                                    hideSelectAll
                                    SearchButton={SearchButton}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default AddTrainingSessionForm;
