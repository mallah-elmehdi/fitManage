import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { cn } from '~/lib/utils';
import { EXERCISE_TYPE, INTENSITY, TEMPO } from '../../lib/enums';
import { AllExercisesDataType } from '../exercises/exercises-list';
import { Input } from '~/components/ui/input';

//     exercise_format_id Int

//     exercise_type ExerciseType

//     set        Int?
//     repetition Int?
//     tempo      Tempo?
//     rest       Int        @default(30) // in seconds
//     intensity  Intensity?

const formSchema = z.object({
    exercise_type: z.enum(Object.keys(EXERCISE_TYPE) as [keyof typeof EXERCISE_TYPE]),
    exercise_format: z.object({
        id: z.number(),
        name: z.string(),
    }),
    tempo: z.enum(Object.keys(TEMPO) as [keyof typeof TEMPO]),
    intensity: z.enum(Object.keys(INTENSITY) as [keyof typeof INTENSITY]),
    set: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    repetition: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
    rest: z
        .string()
        .regex(/^\d+(\.\d+)?$/, { message: 'Must be a number' })
        .optional(),
});

export type TrainingSessionType = z.infer<typeof formSchema>;

function AddTrainingSessionExerciseForm({ setExercises }: { setExercises?: (data?: any) => void }) {
    const [data, setData] = useState<AllExercisesDataType | undefined>(undefined);
    const [searchExercise, setSearchExercise] = useState('');
    const debouncedSearch = useDebounce(searchExercise, 300);

    const form = useForm<TrainingSessionType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            exercise_format: undefined,
            exercise_type: undefined,
            tempo: undefined,
            intensity: undefined,
            set: undefined,
            repetition: undefined,
            rest: undefined,
        },
    });

    const getAllExercises = (search?: string) => {
        axios
            .get(`http://localhost:9090/exercise/all?page=1&name=${search}`)
            .then((results) => {
                setData(results.data.result);
                // toast.success(results.data.message);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {});
    };

    function onSubmit(values: TrainingSessionType) {
        if (setExercises !== undefined) {
            setExercises((all: TrainingSessionType[]) => {
                const newAll = [...all];
                newAll.push(values);

                return newAll;
            });
        }
    }

    useEffect(() => {
        const search = () => {
            if (debouncedSearch) {
                getAllExercises(debouncedSearch);
            }
        };

        search();
    }, [debouncedSearch]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="exercise_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exercise type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(EXERCISE_TYPE).map(([key, val]) => (
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
                {/* ------------ */}
                <FormField
                    control={form.control}
                    name="exercise_format"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exercise selection</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                                        >
                                            {field.value
                                                ? data?.exercises.find((exercise) => exercise.id === field.value.id)?.name
                                                : 'Select...'}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search..."
                                            className="h-9"
                                            onValueChange={setSearchExercise}
                                            value={searchExercise}
                                        />
                                        <CommandList>
                                            <CommandEmpty>No data found.</CommandEmpty>
                                            <CommandGroup>
                                                {data?.exercises.map((exercise) => (
                                                    <CommandItem
                                                        value={exercise.name}
                                                        key={exercise.id}
                                                        onSelect={() => {
                                                            form.setValue('exercise_format', { id: exercise.id, name: exercise.name });
                                                        }}
                                                    >
                                                        {exercise.name}
                                                        <Check
                                                            className={cn(
                                                                'ml-auto',
                                                                exercise.name === field.value + '' ? 'opacity-100' : 'opacity-0'
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* ---------- */}
                <FormField
                    control={form.control}
                    name="set"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Set</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a value" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repetition"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repetition</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a value" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rest"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rest</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a value" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tempo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tempo</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(TEMPO).map(([key, val]) => (
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
                    name="intensity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Intensity</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(INTENSITY).map(([key, val]) => (
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

export default AddTrainingSessionExerciseForm;
