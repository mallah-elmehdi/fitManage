// @ts-nocheck
import { Plus } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Button } from '~/components/ui/button';
import AnnualProgram from './annual_program';
import MonthlyWeeklyProgram from './monthly_weekly_program';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { TRAINING_PHASE } from '~/lib/enums';
import { getDaysInMonthByIndex } from '~/lib/funs';

const TrainingProgram = ({ data }: { data: any }) => {
    const dataBreakDown = Array.from({ length: 5 }).map(() =>
        Array.from({ length: 12 }).map((_, index) => Array.from({ length: getDaysInMonthByIndex(index) }).map(() => 0))
    );

    if (data) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const phaseIndex = Object.keys(TRAINING_PHASE).indexOf(element.training_phase);
            const monthIndex = new Date(element.microcycle.mesocycle.start_date).getMonth();
            const dayIndex = new Date(element.date).getDay();

            dataBreakDown[phaseIndex][monthIndex][dayIndex] += 1;
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
