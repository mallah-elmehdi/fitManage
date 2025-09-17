import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

type EmergencyType = {
    physician_name?: string;
    physician_phone?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
};

const Emergency = ({ physician_name, physician_phone, emergency_contact_name, emergency_contact_phone }: EmergencyType) => {
    return (
        <Table className="w-full border-1 ">
            <TableBody>
                <TableRow>
                    <TableHead>Physician name</TableHead>
                    <TableCell>{physician_name || 'undefine'}</TableCell>
                </TableRow>

                <TableRow>
                    <TableHead>Physician phone</TableHead>
                    <TableCell>{physician_phone || 'undefine'}</TableCell>
                </TableRow>

                <TableRow>
                    <TableHead>Emergency contact name</TableHead>
                    <TableCell>{emergency_contact_name || 'undefine'}</TableCell>
                </TableRow>

                <TableRow>
                    <TableHead>Emergency contact phone</TableHead>
                    <TableCell>{emergency_contact_phone || 'undefine'}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default Emergency;
