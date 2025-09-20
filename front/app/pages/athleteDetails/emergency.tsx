import { Table, TableBody, TableCell, TableHead, TableRow } from '~/components/ui/table';
import { useAppSelector } from '~/hooks/use-redux';

const Emergency = () => {
    const { athlete } = useAppSelector((state) => state.athlete);

    return (
        <div className="border rounded-md">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableHead>Physician name</TableHead>
                        <TableCell>{athlete?.physician_name || '-'}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>Physician phone</TableHead>
                        <TableCell>{athlete?.physician_phone || '-'}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>Emergency contact name</TableHead>
                        <TableCell>{athlete?.emergency_contact_name || '-'}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>Emergency contact phone</TableHead>
                        <TableCell>{athlete?.emergency_contact_phone || '-'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default Emergency;
