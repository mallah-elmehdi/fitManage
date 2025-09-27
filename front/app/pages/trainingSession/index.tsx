import { ArrowLeft, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router';
import Layout from '~/components/layout';
import Title from '~/components/title';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import AddTrainingSessionForm from './add_training_session_form';
import AddTrainingSessionExerciseForm, { TrainingSessionType } from './add_training_session_exercise_form';
import { useEffect, useState } from 'react';
import SessionTable from '~/components/session-table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import { getAthleteById } from '~/context/api/athleteApi';
import { toast } from 'sonner';
import { MUSCLE_IMBALANCES } from '~/lib/muscle-imbalances';

const TrainingSession = () => {
    const dispatch = useAppDispatch();
    const { athleteId } = useParams();
    const { athlete } = useAppSelector((state) => state.athlete);

    const [exercises, setExercises] = useState<TrainingSessionType[]>([]);

    useEffect(() => {
        if (athleteId && !athlete) {
            dispatch(getAthleteById(athleteId))
                .unwrap()
                .catch((error) => {
                    toast.error(error?.message || 'Failed to fetch athlete');
                });
        }
    }, [athleteId, dispatch]);

    return (
        <Layout>
            <div className="flex-1 flex gap-5 flex-col">
                <Link className="w-fit" to={`/athlete/${athleteId}`}>
                    <Button size="icon" variant="outline">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Title>CREATE A TRAINING SESSION</Title>
                <Separator />
                {/* ------- */}
                {athlete && athlete.assessments.length > 0 && (
                    <>
                        {/* <Table>
                            <TableBody>
                                {athlete.assessments[0].static.length > 0 && (
                                    <>
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={3}>
                                                Static posture distortion
                                            </TableHead>
                                        </TableRow>
                                        {athlete.assessments[0].static.map((item) => (
                                            <>
                                                <TableRow>
                                                    <TableCell className="text-center">{STATIC_POSTURE_DISTORTION[item]}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="text-center">
                                                        {MUSCLE_IMBALANCES.STATIC_POSTURE_DISTORTION[item]}
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                    </>
                                )}
                                {athlete.assessments[0].overhead_squat.length > 0 && (
                                    <>
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={3}>
                                                Overhead squat posture distortion
                                            </TableHead>
                                        </TableRow>
                                        {athlete.assessments[0].overhead_squat.map((item) => (
                                            <>
                                                <TableRow>
                                                    <TableCell
                                                        className="text-center"
                                                        rowSpan={athlete.assessments[0].overhead_squat.length + 1}
                                                    >
                                                        {OVERHEAD_SQUAT_POSTURE_DISTORTION[item]}
                                                    </TableCell>
                                                    {MUSCLE_IMBALANCES.OVERHEAD_SQUAT_POSTURE_DISTORTION[item].overactive.map((_item) => (
                                                        <TableCell className="text-center">{_item.name}</TableCell>
                                                    ))}
                                                </TableRow>
                                            </>
                                        ))}
                                    </>
                                )}
                                {athlete.assessments[0].pushing.length > 0 && (
                                    <>
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={3}>
                                                Pushing posture distortion
                                            </TableHead>
                                        </TableRow>
                                        {athlete.assessments[0].pushing.map((item) => (
                                            <TableRow>
                                                <TableCell className="text-center">{item}</TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                )}
                                {athlete.assessments[0].pulling.length > 0 && (
                                    <>
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={3}>
                                                Pulling posture distortion
                                            </TableHead>
                                        </TableRow>
                                        {athlete.assessments[0].pushing.map((item) => (
                                            <TableRow>
                                                <TableCell className="text-center">{item}</TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                )}
                                {athlete.assessments[0].single_leg_squat.length > 0 && (
                                    <>
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={3}>
                                                Single squat posture distortion
                                            </TableHead>
                                        </TableRow>
                                        {athlete.assessments[0].single_leg_squat.map((item) => (
                                            <TableRow>
                                                <TableCell className="text-center">{item}</TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                )}
                            </TableBody>
                        </Table> */}
                        <Separator />
                    </>
                )}
                {/* ------- */}
                <Dialog>
                    <DialogTrigger className="ml-auto">
                        <Button variant="outline">
                            <Plus /> Add exercises
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add the exercises details</DialogTitle>
                            <DialogDescription>these are this session exercises</DialogDescription>
                        </DialogHeader>
                        <AddTrainingSessionExerciseForm setExercises={setExercises} />
                    </DialogContent>
                </Dialog>
                <div className="border rounded-md">
                    <SessionTable exercises={exercises} />
                </div>
                <Separator />
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        <AddTrainingSessionForm exercises={exercises} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TrainingSession;
