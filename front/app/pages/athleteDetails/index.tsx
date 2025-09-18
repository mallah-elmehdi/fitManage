import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import Layout from '~/components/layout';
import { Separator } from '~/components/ui/separator';
import { TypographyH2, TypographyP } from '~/components/ui/typography';
import PersonalInfo from './personal_info';
import Emergency from './emergency';
import Assessments from './assessments';
import MedicalAndHealthHistories from './medical_and_health_histories';
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';

const AthleteDetails = () => {
    const { athleteId } = useParams();
    const [athlete, setAthlete] = useState<any>({});

    useEffect(() => {
        if (athleteId)
            axios
                .get('http://localhost:9090/athlete/' + athleteId)
                .then((results) => {
                    setAthlete(results.data.result);
                })
                .catch((error) => {
                    toast.error(error.message);
                })
                .finally(() => {});
    }, []);

    if (athleteId && athlete)
        return (
            <Layout>
                <div className="flex-1 flex gap-3 flex-col">
                    <Separator />
                    {athlete && athlete.medical_and_health_histories && athlete.medical_and_health_histories.length > 0 && (
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>This athlete has a medical and health history</AlertTitle>
                            <AlertDescription></AlertDescription>
                        </Alert>
                    )}
                    <div className="bg-neutral-700 w-fit p-2 flex">
                        <TypographyH2 className="text-white uppercase">{athlete?.name}</TypographyH2>
                    </div>
                    <Separator />
                    {/* ------------------------------ */}
                    <div className="bg-slate-200 w-fit p-1">
                        <TypographyP>MACRO CYCLE</TypographyP>
                    </div>
                    <Separator />
                    {/* ------------------------------ */}
                    <Collapsible defaultOpen className="flex gap-3 flex-col">
                        <CollapsibleTrigger>
                            <div className="bg-slate-200 w-fit p-1">
                                <TypographyP>PERSONAL INFO</TypographyP>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="grid grid-flow-row sm:grid-cols-2 gap-4 grid-cols-1 ">
                                <div className="col-span-1">
                                    <PersonalInfo {...athlete} />
                                </div>
                                <div className="col-span-1">
                                    <Emergency {...athlete} />
                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <Separator />
                    {/* ----------------------------------- */}
                    <Collapsible defaultOpen className="flex gap-3 flex-col">
                        <CollapsibleTrigger>
                            <div className="bg-slate-200 w-fit p-1">
                                <TypographyP>MEDICAL & HEALTH HISTORY</TypographyP>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <MedicalAndHealthHistories
                                data={athlete?.medical_and_health_histories ? athlete?.medical_and_health_histories : []}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                    <Separator />
                    {/* ----------------------------------- */}
                    <Collapsible defaultOpen className="flex gap-3 flex-col">
                        <CollapsibleTrigger>
                            <div className="bg-slate-200 w-fit p-1">
                                <TypographyP>ASSESSMENTS</TypographyP>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <Assessments data={athlete?.assessments ? athlete?.assessments : []} />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </Layout>
        );
    else if (athleteId && !athlete)
        return (
            <Layout>
                <div className="flex-1 flex gap-3 flex-col">
                    <Separator />
                    <div className="bg-neutral-200 w-fit p-2">
                        <TypographyH2 className=" uppercase p-3">Not Found</TypographyH2>
                    </div>
                    <Separator />
                </div>
            </Layout>
        );

    return null;
};

export default AthleteDetails;
