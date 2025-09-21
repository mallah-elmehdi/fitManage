import ExerciseCard from '~/components/exercise-card';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { ExerciseFormatType } from '~/lib/types';

const ExerciseDetail = ({ name, exercise }: { name: string; exercise: ExerciseFormatType }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="link">
                    {name}
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-auto h-[100vh]">
                <ExerciseCard exercise={exercise} />
            </DialogContent>
        </Dialog>
    );
};

export default ExerciseDetail;
