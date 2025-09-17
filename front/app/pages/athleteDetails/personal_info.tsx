import { Table, TableBody, TableCell, TableHead, TableRow } from '~/components/ui/table';

type PersonalInfoType = {
    email: string;
    phone: string;
    age: string;
    gender: string;
};

const PersonalInfo = ({ email, phone, age, gender }: PersonalInfoType) => {
    return (
        <Table className="w-full border-1">
            <TableBody>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableCell>{email}</TableCell>
                </TableRow>

                <TableRow>
                    <TableHead>phone</TableHead>
                    <TableCell>{phone}</TableCell>
                </TableRow>

                <TableRow>
                    <TableHead>age</TableHead>
                    <TableCell>{age}</TableCell>
                </TableRow>

                <TableRow>
                    <TableHead>gender</TableHead>
                    <TableCell>{gender}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default PersonalInfo;
