import Layout from '~/components/layout';
import Title from '~/components/title';
import { Separator } from '~/components/ui/separator';
import AddTrainingSessionForm from './add_training_session_form';

const TrainingSession = () => {
    return (
        <Layout>
            <div className="flex-1 flex gap-5 flex-col">
                <Title>CREATE A TRAINING SESSION</Title>
                <Separator />
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
