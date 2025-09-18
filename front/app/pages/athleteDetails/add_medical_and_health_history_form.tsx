import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { MultiSelect } from '~/components/ui/multi-select';
import { CHRONIC_DISEASE_TYPE, INJURY_TYPE, MEDICATION_TYPE, SURGERY_TYPE } from '~/lib/enums';

const medicalAndHealthHistorySchema = z.object({
    past_injuries: z.array(z.enum(Object.keys(INJURY_TYPE) as [keyof typeof INJURY_TYPE])),
    past_surgeries: z.array(z.enum(Object.keys(SURGERY_TYPE) as [keyof typeof SURGERY_TYPE])),
    chronic_disease: z.array(z.enum(Object.keys(CHRONIC_DISEASE_TYPE) as [keyof typeof CHRONIC_DISEASE_TYPE])),
    medications: z.array(z.enum(Object.keys(MEDICATION_TYPE) as [keyof typeof MEDICATION_TYPE])),
});

type MedicalAndHealthHistoryFormValues = z.infer<typeof medicalAndHealthHistorySchema>;

function AddMedicalAndHealthHistoryForm() {
    const { athleteId } = useParams();

    const form = useForm<MedicalAndHealthHistoryFormValues>({
        resolver: zodResolver(medicalAndHealthHistorySchema),
        defaultValues: {
            past_injuries: [],
            past_surgeries: [],
            chronic_disease: [],
            medications: [],
        },
    });

    function onSubmit(values: MedicalAndHealthHistoryFormValues) {
        axios
            .post('http://localhost:9090/medical-and-health-history', {
                athleteId: parseInt(athleteId || '0'),
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Movement Screening (checkboxes or multi-select) */}
                <FormField
                    control={form.control}
                    name="past_injuries"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Past Injuries</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    options={Object.entries(INJURY_TYPE).map(([value, label]) => ({
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
                    name="past_surgeries"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Past Surgeries</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    options={Object.entries(SURGERY_TYPE).map(([value, label]) => ({
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
                    name="chronic_disease"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Chronic Disease</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    options={Object.entries(CHRONIC_DISEASE_TYPE).map(([value, label]) => ({
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
                    name="medications"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Medications</FormLabel>

                            <FormControl>
                                <MultiSelect
                                    options={Object.entries(MEDICATION_TYPE).map(([value, label]) => ({
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default AddMedicalAndHealthHistoryForm;
