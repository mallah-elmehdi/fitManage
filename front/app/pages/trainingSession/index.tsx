import { ArrowLeft, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router';
import Layout from '~/components/layout';
import Title from '~/components/title';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import AddTrainingSessionForm from './add_training_session_form';
import AddTrainingSessionExerciseForm, { TrainingSessionType } from './add_training_session_exercise_form';
import { useState } from 'react';
import SessionTable from '~/components/session-table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';

const TrainingSession = () => {
    const { athleteId } = useParams();
    const [exercises, setExercises] = useState<TrainingSessionType[]>([]);

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
