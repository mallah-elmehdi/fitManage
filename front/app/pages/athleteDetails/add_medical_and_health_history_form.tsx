import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { MultiSelect } from '~/components/ui/multi-select';
import { createMedicalAndHealthHistory } from '~/context/api/medicalAndHealthHistoryApi';
import { useAppDispatch } from '~/hooks/use-redux';
import { CHRONIC_DISEASE_TYPE, INJURY_TYPE, MEDICATION_TYPE, SURGERY_TYPE } from '~/lib/enums';

const medicalAndHealthHistorySchema = z.object({
    past_injuries: z.array(z.enum(Object.keys(INJURY_TYPE) as [keyof typeof INJURY_TYPE])),
    past_surgeries: z.array(z.enum(Object.keys(SURGERY_TYPE) as [keyof typeof SURGERY_TYPE])),
    chronic_disease: z.array(z.enum(Object.keys(CHRONIC_DISEASE_TYPE) as [keyof typeof CHRONIC_DISEASE_TYPE])),
    medications: z.array(z.enum(Object.keys(MEDICATION_TYPE) as [keyof typeof MEDICATION_TYPE])),
    // --------
    athleteId: z.number().optional(),
});

export type MedicalAndHealthHistoryFormValues = z.infer<typeof medicalAndHealthHistorySchema>;

function AddMedicalAndHealthHistoryForm({ handleDialogClose }: { handleDialogClose: () => void }) {
    const { athleteId } = useParams();
    const dispatch = useAppDispatch();

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
        dispatch(createMedicalAndHealthHistory({ data: { ...values, athleteId: parseInt(athleteId || '-1') }, athleteId: athleteId || '' }))
            .unwrap()
            .then((result) => {
                handleDialogClose();
                toast.success(result.message);
            })
            .catch((error) => {
                toast.error(error?.message || 'Failed to create medical and health history');
            });
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
                                    hideSelectAll
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
                                    hideSelectAll
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
                                    hideSelectAll
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
                                    hideSelectAll
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
