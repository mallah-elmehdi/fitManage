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
                    <div className="bg-neutral-700 w-fit p-2 flex">
                        {athlete ? (
                            <TypographyH2 className="text-white uppercase">{athlete?.name}</TypographyH2>
                        ) : (
                            <TypographyH2>Not Found</TypographyH2>
                        )}
                    </div>
                    <Separator />
                    {/* ------------------------------ */}
                    <div className="bg-slate-200 w-fit p-1">
                        <TypographyP>PERSONAL INFO</TypographyP>
                    </div>
                    <div className="grid grid-flow-row sm:grid-cols-2 gap-4 grid-cols-1 ">
                        <div className="col-span-1">
                            <PersonalInfo {...athlete} />
                        </div>
                        <div className="col-span-1">
                            <Emergency {...athlete} />
                        </div>
                    </div>
                    {/* ----------------------------------- */}
                    <div className="bg-slate-200 w-fit p-1">
                        <TypographyP>ASSESSMENTS</TypographyP>
                    </div>
                    <Assessments data={athlete?.assessments ? athlete?.assessments : []} />
                    {/* assessment     Assessment[] */}
                    {/* WorkoutSession WorkoutSession[] */}
                </div>
            </Layout>
        );
    else if (!athlete)
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
