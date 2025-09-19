import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import AnnualProgram from './annual_program';
import MonthlyWeeklyProgram from './monthly_weekly_program';
import { Plus } from 'lucide-react';
import AddTrainingSessionForm from './add_training_session_form';

const TrainingProgram = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center py-4 gap-2 sm:flex-row-reverse flex-col">
                <Dialog>
                    <DialogTrigger className="ml-auto">
                        <Button variant="outline">
                            <Plus /> Add Training Session Form
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-auto">
                        <DialogHeader>
                            <DialogTitle>Add Training Session Form</DialogTitle>
                            <DialogDescription>these are the training session form detail</DialogDescription>
                        </DialogHeader>
                        {/* ----------add here */}
                        <AddTrainingSessionForm />
                    </DialogContent>
                </Dialog>
            </div>
            <AnnualProgram />
            <MonthlyWeeklyProgram />
        </div>
    );
};

export default TrainingProgram;
