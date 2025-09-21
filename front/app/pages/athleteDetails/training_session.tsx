// @ts-nocheck
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Badge } from '~/components/ui/badge';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '~/components/ui/drawer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { getWorkoutSessionById } from '~/context/api/workoutSession';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import { EXERCISE_TYPE, INTENSITY, TEMPO, TRAINING_PHASE } from '~/lib/enums';
import ExerciseDetail from './exercise_detail';

const TrainingSession = ({
    numberOfSessions,
    workoutSessionId,
    isToday,
}: {
    numberOfSessions: number;
    workoutSessionId?: number | null;
    isToday?: boolean;
}) => {
    const dispatch = useAppDispatch();
    const { workoutSession } = useAppSelector((state) => state.workoutSession);
    const handleFetch = () => {
        dispatch(getWorkoutSessionById(workoutSessionId + ''))
            .unwrap()
            .catch((error) => {
                toast.error(error?.message || 'Failed to fetch workout session');
            });
    };

    return !workoutSessionId ? (
        <Badge className={`${isToday ? 'bg-secondary text-primary' : ''}`}>{numberOfSessions}</Badge>
    ) : (
        <Drawer>
            <DrawerTrigger asChild onClick={handleFetch}>
                <Badge className={`cursor-pointer ${isToday ? 'bg-secondary text-primary' : ''}`}>{numberOfSessions}</Badge>
            </DrawerTrigger>
            {workoutSession && (
                <DrawerContent>
                    <div className="px-10 pb-10 overflow-auto h-120">
                        <div className="mx-auto w-full max-w-6xl ">
                            <DrawerHeader>
                                <DrawerTitle>{format(workoutSession.date, 'PPPP')} </DrawerTitle>
                                {/* @ts-ignore: Unreachable code error */}
                                <DrawerDescription>{TRAINING_PHASE[workoutSession.training_phase]} </DrawerDescription>
                            </DrawerHeader>
                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center">EXERCISE</TableHead>
                                            <TableHead className="text-center w-30">SETS</TableHead>
                                            <TableHead className="text-center w-30">REPS</TableHead>
                                            <TableHead className="text-center w-30">REST</TableHead>
                                            <TableHead className="text-center w-30">TEMPO</TableHead>
                                            <TableHead className="text-center w-30">INTENSITY</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={6}>
                                                {EXERCISE_TYPE.WORM_UP}
                                            </TableHead>
                                        </TableRow>
                                        {workoutSession.exercises
                                            .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.WORM_UP)
                                            .map((exercise) => (
                                                <TableRow>
                                                    <ExerciseDetail
                                                        name={exercise.exercise_format.name}
                                                        exercise={exercise.exercise_format}
                                                    />
                                                    <TableCell className="text-center w-30">{exercise.set}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.repetition}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.rest}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{TEMPO[exercise.tempo]}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{INTENSITY[exercise.intensity]}</TableCell>
                                                </TableRow>
                                            ))}
                                        {/* --- */}
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={6}>
                                                {EXERCISE_TYPE.ACTIVATION}
                                            </TableHead>
                                        </TableRow>
                                        {workoutSession.exercises
                                            .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.ACTIVATION)
                                            .map((exercise) => (
                                                <TableRow>
                                                    <ExerciseDetail
                                                        name={exercise.exercise_format.name}
                                                        exercise={exercise.exercise_format}
                                                    />
                                                    <TableCell className="text-center w-30">{exercise.set}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.repetition}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.rest}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{TEMPO[exercise.tempo]}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{INTENSITY[exercise.intensity]}</TableCell>
                                                </TableRow>
                                            ))}
                                        {/* --- */}
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={6}>
                                                {EXERCISE_TYPE.SKILL_DEVELOPMENT}
                                            </TableHead>
                                        </TableRow>
                                        {workoutSession.exercises
                                            .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.SKILL_DEVELOPMENT)
                                            .map((exercise) => (
                                                <TableRow>
                                                    <ExerciseDetail
                                                        name={exercise.exercise_format.name}
                                                        exercise={exercise.exercise_format}
                                                    />
                                                    <TableCell className="text-center w-30">{exercise.set}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.repetition}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.rest}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{TEMPO[exercise.tempo]}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{INTENSITY[exercise.intensity]}</TableCell>
                                                </TableRow>
                                            ))}
                                        {/* --- */}
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={6}>
                                                {EXERCISE_TYPE.RESISTANCE}
                                            </TableHead>
                                        </TableRow>
                                        {workoutSession.exercises
                                            .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.RESISTANCE)
                                            .map((exercise) => (
                                                <TableRow>
                                                    <ExerciseDetail
                                                        name={exercise.exercise_format.name}
                                                        exercise={exercise.exercise_format}
                                                    />
                                                    <TableCell className="text-center w-30">{exercise.set}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.repetition}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.rest}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{TEMPO[exercise.tempo]}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{INTENSITY[exercise.intensity]}</TableCell>
                                                </TableRow>
                                            ))}
                                        {/* --- */}
                                        <TableRow className="bg-secondary">
                                            <TableHead className="text-center" colSpan={6}>
                                                {EXERCISE_TYPE.COOL_DOWN}
                                            </TableHead>
                                        </TableRow>
                                        {workoutSession.exercises
                                            .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.COOL_DOWN)
                                            .map((exercise) => (
                                                <TableRow>
                                                    <ExerciseDetail
                                                        name={exercise.exercise_format.name}
                                                        exercise={exercise.exercise_format}
                                                    />
                                                    <TableCell className="text-center w-30">{exercise.set}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.repetition}</TableCell>
                                                    <TableCell className="text-center w-30">{exercise.rest}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{TEMPO[exercise.tempo]}</TableCell>
                                                    {/* @ts-ignore: Unreachable code error */}
                                                    <TableCell className="text-center w-30">{INTENSITY[exercise.intensity]}</TableCell>
                                                </TableRow>
                                            ))}
                                        {/* --- */}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {/* <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter> */}
                    </div>
                </DrawerContent>
            )}
        </Drawer>
    );
};

export default TrainingSession;
