import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { createInitAthlete } from '~/context/api/athleteApi';
import { useAppDispatch } from '~/hooks/use-redux';
import { GENDER } from '~/lib/enums';

const formSchema = z.object({
    name: z.string().nonempty().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    email: z.email(),
    phone: z.string().nonempty().regex(/^\d+$/, {
        message: 'Must contain only digits',
    }),
    age: z.number().min(0),
    gender: z.enum(Object.keys(GENDER)),
});

export type AthleteInitFormValues = z.infer<typeof formSchema>;

export function AddAthleteForm({ handleDialogClose }: { handleDialogClose: () => void }) {
    const dispatch = useAppDispatch();

    const form = useForm<AthleteInitFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            age: undefined,
            gender: undefined,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: AthleteInitFormValues) {
        dispatch(createInitAthlete(values))
            .unwrap()
            .then((result) => {
                handleDialogClose();
                toast.success(result.message);
            })
            .catch((error) => {
                toast.error(error?.message || 'Failed to create athlete');
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your phone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your age"
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
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose your gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(GENDER).map((gender) => (
                                        <SelectItem key={gender[0]} value={gender[0]}>
                                            {gender[1]}
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
