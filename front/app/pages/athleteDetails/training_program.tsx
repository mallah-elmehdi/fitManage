import AnnualProgram from './annual_program';
import MonthlyWeeklyProgram from './monthly_weekly_program';

const TrainingProgram = () => {
    return (
        <div className="flex flex-col gap-3">
            <AnnualProgram />
            <MonthlyWeeklyProgram />
        </div>
    );
};

export default TrainingProgram;
