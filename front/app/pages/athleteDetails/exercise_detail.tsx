// @ts-nocheck
import ExerciseCard from '~/components/exercise-card';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { TypographyP } from '~/components/ui/typography';
import { ExerciseFormatType } from '~/lib/types';

const ExerciseDetail = ({ name, exercise }: { name: string; exercise: ExerciseFormatType | { name: string; id: number } }) => {
    return exercise.primary_muscles ? (
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
    ) : (
        name
    );
};

export default ExerciseDetail;
