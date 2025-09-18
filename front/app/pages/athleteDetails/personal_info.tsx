import { Table, TableBody, TableCell, TableHead, TableRow } from '~/components/ui/table';

type PersonalInfoType = {
    email: string;
    phone: string;
    age: string;
    gender: string;
};

const PersonalInfo = ({ email, phone, age, gender }: PersonalInfoType) => {
    return (
        <div className="border rounded-md">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableCell className="lowercase">{email}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>phone</TableHead>
                        <TableCell className="lowercase">{phone}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>age</TableHead>
                        <TableCell className="lowercase">{age}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableHead>gender</TableHead>
                        <TableCell className="lowercase">{gender}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default PersonalInfo;
