import { AlertCircleIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import Layout from '~/components/layout';
import Title from '~/components/title';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { Separator } from '~/components/ui/separator';
import { TypographyH2 } from '~/components/ui/typography';
import { getAthleteById } from '~/context/api/athleteApi';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import Assessments from './assessments';
import Emergency from './emergency';
import MedicalAndHealthHistories from './medical_and_health_histories';
import PersonalInfo from './personal_info';
import TrainingProgram from './training_program';

const AthleteDetails = () => {
    const dispatch = useAppDispatch();
    const { athlete } = useAppSelector((state) => state.athlete);

    const { athleteId } = useParams();

    useEffect(() => {
        if (athleteId) {
            dispatch(getAthleteById(athleteId))
                .unwrap()
                .catch((error) => {
                    toast.error(error?.message || 'Failed to fetch athlete');
                });
        }
    }, [athleteId, dispatch]);

    return (
        <Layout>
            {athlete ? (
                <div className="flex-1 flex gap-3 flex-col">
                    <Separator />

                    {athlete && athlete.medical_and_health_histories && athlete.medical_and_health_histories.length > 0 && (
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>This athlete has a medical and health history</AlertTitle>
                            <AlertDescription></AlertDescription>
                        </Alert>
                    )}
                    <div className="bg-primary w-fit p-2 flex">
                        <TypographyH2 className="text-white uppercase">{athlete?.name}</TypographyH2>
                    </div>
                    <Separator />
                    {/* ------------------------------ */}
                    <Collapsible defaultOpen className="flex gap-3 flex-col">
                        <CollapsibleTrigger>
                            <Title>TRAINING PROGRAM</Title>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <TrainingProgram  />
                        </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                    {/* ------------------------------ */}
                    <Collapsible defaultOpen className="flex gap-3 flex-col">
                        <CollapsibleTrigger>
                            <Title>PERSONAL INFO</Title>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="grid grid-flow-row sm:grid-cols-2 gap-4 grid-cols-1 ">
                                <div className="col-span-1">
                                    <PersonalInfo />
                                </div>
                                <div className="col-span-1">
                                    <Emergency />
                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <Separator />
                    {/* ----------------------------------- */}
                    <Collapsible defaultOpen className="flex gap-3 flex-col">
                        <CollapsibleTrigger>
                            <Title>MEDICAL & HEALTH HISTORY</Title>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <MedicalAndHealthHistories />
                        </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                    {/* ----------------------------------- */}
                    <Collapsible defaultOpen className="flex gap-3 flex-col">
                        <CollapsibleTrigger>
                            <Title>ASSESSMENTS</Title>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <Assessments />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            ) : (
                <Title>NOT FOUND</Title>
            )}
        </Layout>
    );
};

export default AthleteDetails;
