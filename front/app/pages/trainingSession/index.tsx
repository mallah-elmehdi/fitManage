import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import Layout from '~/components/layout';
import Title from '~/components/title';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import AddTrainingSessionForm from './add_training_session_form';

const TrainingSession = () => {
    const { athleteId } = useParams();

    return (
        <Layout>
            <div className="flex-1 flex gap-5 flex-col">
                <Title>CREATE A TRAINING SESSION</Title>
                <Separator />
                <Link className="w-fit" to={`/athlete/${athleteId}`}>
                    <Button className="w-fit" variant="outline">
                        <ArrowLeft />
                        back
                    </Button>
                </Link>
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        <AddTrainingSessionForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TrainingSession;
