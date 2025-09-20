import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import TrainingSession from './training_session';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SessionRender = ({ data, index }: { data: number[][][] | undefined; index: number }) => {
    return (
        <>
            {data &&
                data[index].map((sessions) => {
                    const numberOfSessions = sessions.reduce((a, b) => a + b);
                    return (
                        <>
                            {numberOfSessions === 0 ? (
                                <TableCell className="text-center" />
                            ) : (
                                <TableCell className="text-center">
                                    <TrainingSession disabled numberOfSessions={numberOfSessions} />
                                </TableCell>
                            )}
                        </>
                    );
                })}
        </>
    );
};

const AnnualProgram = ({ data }: { data: number[][][] | undefined }) => {
    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center bg-secondary rounded-t-md" colSpan={14}>
                            ANNUAL PROGRAM
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center " rowSpan={2}>
                            LEVEL
                        </TableHead>
                        <TableHead className="text-center">MONTH</TableHead>
                        {months.map((month) => (
                            <TableHead className="text-center" rowSpan={2}>
                                {month}
                            </TableHead>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center " rowSpan={2}>
                            PHASE
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableHead className="text-center ">Stabilization</TableHead>
                        <TableHead className="text-center ">1</TableHead>
                        <SessionRender data={data} index={0} />
                    </TableRow>

                    <TableRow>
                        <TableHead rowSpan={3} className="text-center ">
                            Strength
                        </TableHead>
                        <TableHead className="text-center ">2</TableHead>
                        <SessionRender data={data} index={1} />
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center ">3</TableHead>
                        <SessionRender data={data} index={2} />
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center ">4</TableHead>
                        <SessionRender data={data} index={3} />
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center  rounded-bl-md">Power</TableHead>
                        <TableHead className="text-center ">5</TableHead>
                        <SessionRender data={data} index={4} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default AnnualProgram;
