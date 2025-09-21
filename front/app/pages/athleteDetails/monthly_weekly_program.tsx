import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { getMonthDaysIndex } from '~/lib/funs';
import { TrainingProgramTableType } from './training_program';
import TrainingSession from './training_session';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SessionRender = ({ numberOfSessions, workoutSessionId }: { numberOfSessions: number; workoutSessionId: number | null }) => {
    return (
        <>
            {numberOfSessions === 0 ? (
                <TableCell className="text-center" />
            ) : (
                <TableCell className="text-center">
                    <TrainingSession workoutSessionId={workoutSessionId} numberOfSessions={numberOfSessions} />
                </TableCell>
            )}
        </>
    );
};

const MonthlyWeeklyProgram = ({ data }: { data: TrainingProgramTableType }) => {
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [daysIndex, setDaysIndex] = useState(getMonthDaysIndex(monthIndex));
    const today = new Date();
    const thisDay = today.getDate() - 1;
    const thisMonth = today.getMonth();

    const getBGColor = (index: number) => {
        if (thisMonth > monthIndex) return 'bg-secondary';
        else if (thisMonth === monthIndex) {
            return thisDay > index ? 'bg-secondary' : thisDay === index ? 'bg-primary text-secondary' : 'bg-white';
        } else return 'bg-white';
    };

    useEffect(() => {
        setDaysIndex(getMonthDaysIndex(monthIndex));
    }, [monthIndex]);

    return (
        <div className="border rounded-md">
            {data && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="  bg-secondary rounded-t-md" colSpan={daysIndex.length + 1}>
                                <div className="flex items-center justify-center gap-3">
                                    MONTHLY/WEEKLY PLAN
                                    <Select
                                        defaultValue={months[monthIndex]}
                                        onValueChange={(value) => setMonthIndex(months.indexOf(value))}
                                    >
                                        <SelectTrigger className="w-[180px]">
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
                            <TableHead className=" text-center ">WEEK</TableHead>
                            <TableHead className=" text-center " colSpan={7}>
                                1
                            </TableHead>
                            <TableHead className=" text-center" colSpan={7}>
                                2
                            </TableHead>
                            <TableHead className="  text-center" colSpan={7}>
                                3
                            </TableHead>
                            <TableHead className="  text-center" colSpan={7}>
                                4
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead className="text-center">DAY</TableHead>
                            {daysIndex.map((dayIndex, index) => (
                                <TableCell rowSpan={2} className={`text-center ${getBGColor(index)}`}>
                                    {days[dayIndex]}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableHead className="text-center">PHASE</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableHead className="text-center">1</TableHead>
                            {data[0][monthIndex].map((session, index) => (
                                <TableCell className={`text-center ${getBGColor(index)}`}>
                                    {session.numberOfSessions > 0 && <TrainingSession isToday={index === thisDay} {...session} />}
                                </TableCell>
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">2</TableHead>
                            {data[1][monthIndex].map((session, index) => (
                                <TableCell className={`text-center ${getBGColor(index)}`}>
                                    {session.numberOfSessions > 0 && <TrainingSession isToday={index === thisDay} {...session} />}
                                </TableCell>
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">3</TableHead>
                            {data[2][monthIndex].map((session, index) => (
                                <TableCell className={`text-center ${getBGColor(index)}`}>
                                    {session.numberOfSessions > 0 && <TrainingSession isToday={index === thisDay} {...session} />}
                                </TableCell>
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">4</TableHead>
                            {data[3][monthIndex].map((session, index) => (
                                <TableCell className={`text-center ${getBGColor(index)}`}>
                                    {session.numberOfSessions > 0 && <TrainingSession isToday={index === thisDay} {...session} />}
                                </TableCell>
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">5</TableHead>
                            {data[4][monthIndex].map((session, index) => (
                                <TableCell className={`text-center ${getBGColor(index)}`}>
                                    {session.numberOfSessions > 0 && <TrainingSession isToday={index === thisDay} {...session} />}
                                </TableCell>
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">Cardio</TableHead>
                            {data[4][monthIndex].map((session, index) => (
                                <TableCell className={`text-center ${getBGColor(index)}`}>
                                    {session.numberOfSessions > 0 && <TrainingSession isToday={index === thisDay} {...session} />}
                                </TableCell>
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">Reassess</TableHead>
                            {data[4][monthIndex].map((session, index) => (
                                <TableCell className={`text-center ${getBGColor(index)}`}>
                                    {session.numberOfSessions > 0 && <TrainingSession isToday={index === thisDay} {...session} />}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default MonthlyWeeklyProgram;
