import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { useAppSelector } from '~/hooks/use-redux';
import { TRAINING_PHASE } from '~/lib/enums';
import { getDaysInMonthByIndex } from '~/lib/funs';
import AnnualProgram from './annual_program';
import MonthlyWeeklyProgram from './monthly_weekly_program';

export type TrainingProgramTableType = { workoutSessionId: number | null; numberOfSessions: number }[][][];

const TrainingProgram = () => {
    const { athlete } = useAppSelector((state) => state.athlete);

    const dataBreakDown: TrainingProgramTableType = Array.from({ length: 5 }).map(() =>
        Array.from({ length: 12 }).map((_, index) =>
            Array.from({ length: getDaysInMonthByIndex(index) }).map(() => ({
                numberOfSessions: 0,
                workoutSessionId: null,
            }))
        )
    );

    if (athlete?.WorkoutSessions) {
        for (let i = 0; i < athlete.WorkoutSessions.length; i++) {
            const element = athlete.WorkoutSessions[i];
            const phaseIndex = Object.keys(TRAINING_PHASE).indexOf(element.training_phase);
            const monthIndex = new Date(element.microcycle.mesocycle.start_date).getMonth();
            const dayIndex = new Date(element.date).getDate() - 1;

            dataBreakDown[phaseIndex][monthIndex][dayIndex].numberOfSessions += 1;
            dataBreakDown[phaseIndex][monthIndex][dayIndex].workoutSessionId = element.id;
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <Link to="training-session" className="self-end">
                <Button variant="outline">
                    <Plus /> Add Training Session Form
                </Button>
            </Link>
            <AnnualProgram data={dataBreakDown} />
            <MonthlyWeeklyProgram data={dataBreakDown} />
        </div>
    );
};

export default TrainingProgram;
