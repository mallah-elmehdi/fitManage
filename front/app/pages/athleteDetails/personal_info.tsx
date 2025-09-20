import { Table, TableBody, TableCell, TableHead, TableRow } from '~/components/ui/table';
import { useAppSelector } from '~/hooks/use-redux';

const PersonalInfo = () => {
    const { athlete } = useAppSelector((state) => state.athlete);
    return (
        <div className="border rounded-md">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableCell className="lowercase">{athlete?.email}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>phone</TableHead>
                        <TableCell className="lowercase">{athlete?.phone}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>age</TableHead>
                        <TableCell className="lowercase">{athlete?.age}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>gender</TableHead>
                        <TableCell className="lowercase">{athlete?.gender}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default PersonalInfo;
