import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AnnualProgram = () => {
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
                        {months.map((month) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>

                    <TableRow>
                        <TableHead rowSpan={3} className="text-center ">
                            Strength
                        </TableHead>
                        <TableHead className="text-center ">2</TableHead>
                        {months.map((month) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center ">3</TableHead>
                        {months.map((month) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center ">4</TableHead>
                        {months.map((month) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableHead className="text-center  rounded-bl-md">Power</TableHead>
                        <TableHead className="text-center ">5</TableHead>
                        {months.map((month) => (
                            <TableCell className="text-center"></TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default AnnualProgram;
