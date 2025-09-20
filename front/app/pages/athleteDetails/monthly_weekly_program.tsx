import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import TrainingSession from './training_session';
import { useEffect, useState } from 'react';
import { getMonthDaysIndex } from '~/lib/funs';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SessionRender = ({ numberOfSessions }: { numberOfSessions: number }) => {
    return (
        <>
            {numberOfSessions === 0 ? (
                <TableCell className="text-center" />
            ) : (
                <TableCell className="text-center">
                    <TrainingSession numberOfSessions={numberOfSessions} />
                </TableCell>
            )}
        </>
    );
};

const MonthlyWeeklyProgram = ({ data }: { data: number[][][] | undefined }) => {
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const [daysIndex, setDaysIndex] = useState(getMonthDaysIndex(monthIndex));

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
                            {daysIndex.map((index) => (
                                <TableCell rowSpan={2} className="text-center">
                                    {days[index]}
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
                            {data[0][monthIndex].map((session) => (
                                <SessionRender numberOfSessions={session} />
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">2</TableHead>
                            {data[1][monthIndex].map((session) => (
                                <SessionRender numberOfSessions={session} />
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">3</TableHead>
                            {data[2][monthIndex].map((session) => (
                                <SessionRender numberOfSessions={session} />
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">4</TableHead>
                            {data[3][monthIndex].map((session) => (
                                <SessionRender numberOfSessions={session} />
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">5</TableHead>
                            {data[4][monthIndex].map((session) => (
                                <SessionRender numberOfSessions={session} />
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">Cardio</TableHead>
                            {data[4][monthIndex].map((session) => (
                                <SessionRender numberOfSessions={session} />
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableHead className="text-center">Reassess</TableHead>
                            {data[4][monthIndex].map((session) => (
                                <SessionRender numberOfSessions={session} />
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default MonthlyWeeklyProgram;
