import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import TrainingSession from './training_session';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyWeeklyProgram = () => {
    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="  bg-secondary rounded-t-md" colSpan={29}>
                            <div className="flex items-center justify-center gap-3">
                                MONTHLY/WEEKLY PLAN
                                <Select>
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
                        <TableHead className="text-center  ">DAY</TableHead>
                        {days.map((day) => (
                            <TableCell rowSpan={2} className="text-center ">
                                {day}
                            </TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell rowSpan={2} className="text-center ">
                                {day}
                            </TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell rowSpan={2} className="text-center   ">
                                {day}
                            </TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell rowSpan={2} className="text-center  ">
                                {day}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center  ">PHASE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableHead className="text-center">1</TableHead>
                        {days.map((day) => (
                            <TableCell className="text-center">
                                <TrainingSession />
                            </TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>

                    <TableRow>
                        <TableHead className="text-center">2</TableHead>
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>

                    <TableRow>
                        <TableHead className="text-center">3</TableHead>
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>

                    <TableRow>
                        <TableHead className="text-center">4</TableHead>
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>

                    <TableRow>
                        <TableHead className="text-center">5</TableHead>
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>

                    <TableRow>
                        <TableHead className="text-center">Cardio</TableHead>
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>

                    <TableRow>
                        <TableHead className="text-center">Reassess</TableHead>
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                        {days.map((day) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default MonthlyWeeklyProgram;
