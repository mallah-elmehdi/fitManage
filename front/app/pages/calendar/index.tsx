import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Layout from '~/components/layout';
import PageTitle from '~/components/page-title';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { getAllWorkoutSessions } from '~/context/api/workoutSession';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import { findIndex2D, getMonthWeeks } from '~/lib/funs';
import { SIDEBAR_MENU } from '~/lib/sidebar-menu';
import TrainingSession from '../athleteDetails/training_session';
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type CalendarDataType = {
    athleteName: string;
    workoutSessionId: number;
};

const Calendar = () => {
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [daysIndex, setDaysIndex] = useState(getMonthWeeks(monthIndex));
    const initData: CalendarDataType[][][] = daysIndex.map((week) => week.map((day) => []));
    const [data, setData] = useState<CalendarDataType[][][]>(initData);

    const today = new Date();
    const thisDay = today.getDate() - 1;
    const thisMonth = today.getMonth();

    const getBGColor = (index: number) => {
        if (thisMonth > monthIndex) return 'bg-secondary';
        else if (thisMonth === monthIndex) {
            return thisDay > index ? 'bg-secondary' : thisDay === index ? 'bg-primary text-secondary' : 'bg-white';
        } else return 'bg-white';
    };

    const dispatch = useAppDispatch();
    const { workoutSessions } = useAppSelector((state) => state.workoutSession);

    useEffect(() => {
        if (monthIndex) {
            setDaysIndex(getMonthWeeks(monthIndex));
            dispatch(getAllWorkoutSessions({ monthIndex: monthIndex + '' }))
                .unwrap()
                .catch((error) => {
                    toast.error(error?.message || 'Failed to fetch all workout sessions');
                });
        }
    }, [monthIndex, dispatch]);

    useEffect(() => {
        if (workoutSessions.length > 0) {
            for (let i = 0; i < workoutSessions.length; i++) {
                const element = workoutSessions[i];

                const dayIndex = new Date(element.date).getDate() - 1;
                const [weekIndex, dateIndex] = findIndex2D(daysIndex, dayIndex);

                const newState = [...initData];
                if (!newState[weekIndex][dateIndex].map((item) => item.workoutSessionId).includes(element.id))
                    newState[weekIndex][dateIndex].push({
                        athleteName: element.athlete.name || '',
                        workoutSessionId: element.id,
                    });

                setData(newState);
            }
        } else {
            setData(initData);
        }
    }, [workoutSessions]);

    return (
        <Layout>
            <div className="flex-1 flex space-y-5 flex-col">
                <PageTitle title={SIDEBAR_MENU[1].title} icon={React.createElement(SIDEBAR_MENU[1].icon)} />
                workoutSessions:{workoutSessions.length}
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="  bg-secondary rounded-t-md" colSpan={7}>
                                    <div className="flex items-center justify-center gap-3">
                                        Calendar of
                                        <Select
                                            defaultValue={months[monthIndex]}
                                            onValueChange={(value) => setMonthIndex(months.indexOf(value))}
                                        >
                                            <SelectTrigger size="sm" className="w-fit">
                                                <SelectValue placeholder="Select the month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Months</SelectLabel>
                                                    {months.map((month) => (
                                                        <SelectItem value={month}>{month}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </TableHead>
                            </TableRow>
                            <TableRow>
                                {days.map((day) => (
                                    <TableHead className="bg-secondary text-center">{day}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {daysIndex.map((week, wIndex) => (
                                <TableRow>
                                    {week.map((day, index) =>
                                        day === -1 ? (
                                            <TableCell className="bg-secondary" />
                                        ) : (
                                            <TableCell className={`${getBGColor(day - 1)}`}>
                                                <div className="flex flex-col gap-1 items-center">
                                                    <span>{day}</span>
                                                    {data &&
                                                        data[wIndex] &&
                                                        data[wIndex][index].map((athlete) => (
                                                            <TrainingSession
                                                                numberOfSessions={athlete.athleteName}
                                                                isToday={index === thisDay}
                                                                workoutSessionId={athlete.workoutSessionId}
                                                            />
                                                        ))}
                                                </div>
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Layout>
    );
};

export default Calendar;
