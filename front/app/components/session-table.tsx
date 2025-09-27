// @ts-nocheck
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { EXERCISE_TYPE, INTENSITY, TEMPO } from '~/lib/enums';
import { ExerciseType } from '~/lib/types';
import ExerciseDetail from '~/pages/athleteDetails/exercise_detail';
import { TrainingSessionType } from '~/pages/trainingSession/add_training_session_exercise_form';

const SessionTable = ({ exercises }: { exercises: TrainingSessionType[] | ExerciseType[] }) => {
    return (
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
                {exercises
                    .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.WORM_UP)
                    .map((exercise) => (
                        <TableRow>
                            <TableCell className="text-center ">
                                <ExerciseDetail name={exercise.exercise_format.name} exercise={exercise.exercise_format} />
                            </TableCell>
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
                {exercises
                    .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.ACTIVATION)
                    .map((exercise) => (
                        <TableRow>
                            <TableCell className="text-center ">
                                <ExerciseDetail name={exercise.exercise_format.name} exercise={exercise.exercise_format} />
                            </TableCell>
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
                {exercises
                    .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.SKILL_DEVELOPMENT)
                    .map((exercise) => (
                        <TableRow>
                            <TableCell className="text-center ">
                                <ExerciseDetail name={exercise.exercise_format.name} exercise={exercise.exercise_format} />
                            </TableCell>
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
                {exercises
                    .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.RESISTANCE)
                    .map((exercise) => (
                        <TableRow>
                            <TableCell className="text-center ">
                                <ExerciseDetail name={exercise.exercise_format.name} exercise={exercise.exercise_format} />
                            </TableCell>
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
                {exercises
                    .filter((item) => EXERCISE_TYPE[item.exercise_type] === EXERCISE_TYPE.COOL_DOWN)
                    .map((exercise) => (
                        <TableRow>
                            <TableCell className="text-center ">
                                <ExerciseDetail name={exercise.exercise_format.name} exercise={exercise.exercise_format} />
                            </TableCell>
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
    );
};

export default SessionTable;
