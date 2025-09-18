import { Table, TableBody, TableCell, TableHead, TableRow } from '~/components/ui/table';

type EmergencyType = {
    physician_name?: string;
    physician_phone?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
};

const Emergency = ({ physician_name, physician_phone, emergency_contact_name, emergency_contact_phone }: EmergencyType) => {
    return (
        <div className="border rounded-md">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableHead>Physician name</TableHead>
                        <TableCell>{physician_name || '-'}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>Physician phone</TableHead>
                        <TableCell>{physician_phone || '-'}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>Emergency contact name</TableHead>
                        <TableCell>{emergency_contact_name || '-'}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>Emergency contact phone</TableHead>
                        <TableCell>{emergency_contact_phone || '-'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default Emergency;
