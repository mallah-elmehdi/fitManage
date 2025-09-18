import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, Plus, Trash } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { CHRONIC_DISEASE_TYPE, INJURY_TYPE, MEDICATION_TYPE, SURGERY_TYPE } from '~/lib/enums';
import { dateFormatting } from '~/lib/funs';
import AddMedicalAndHealthHistoryForm from './add_medical_and_health_history_form';
import axios from 'axios';
import { toast } from 'sonner';

export type MedicalAndHealthHistory = {
    id: number;
    past_injuries: INJURY_TYPE[];
    past_surgeries: SURGERY_TYPE[];
    chronic_disease: CHRONIC_DISEASE_TYPE[];
    medications: MEDICATION_TYPE[];
    createdAt: string;
};

export const columns: ColumnDef<MedicalAndHealthHistory>[] = [
    {
        accessorKey: 'createdAt',
        header: 'Assessment date',
        cell: ({ row }) => <div className="capitalize">{dateFormatting(row.getValue('createdAt'))}</div>,
    },
    {
        accessorKey: 'past_injuries',
        header: 'Past injuries',
        cell: ({ row }) => {
            const past_injuries = row.getValue('past_injuries');
            const past_injuries_data = Array.isArray(past_injuries) ? past_injuries : [];
            return (
                <div className="flex gap-1 wrap  flex-col">
                    {past_injuries_data.length > 0
                        ? past_injuries_data.map((item: keyof typeof INJURY_TYPE) => {
                              return <Badge>{INJURY_TYPE[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'past_surgeries',
        header: 'Past surgeries',
        cell: ({ row }) => {
            const past_surgeries = row.getValue('past_surgeries');
            const past_surgeries_data = Array.isArray(past_surgeries) ? past_surgeries : [];
            return (
                <div className="flex gap-1 wrap  flex-col">
                    {past_surgeries_data.length > 0
                        ? past_surgeries_data.map((item: keyof typeof SURGERY_TYPE) => {
                              return <Badge>{SURGERY_TYPE[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'chronic_disease',
        header: 'Chronic disease',
        cell: ({ row }) => {
            const chronic_disease = row.getValue('chronic_disease');
            const chronic_disease_data = Array.isArray(chronic_disease) ? chronic_disease : [];
            return (
                <div className="flex gap-1 wrap  flex-col">
                    {chronic_disease_data.length > 0
                        ? chronic_disease_data.map((item: keyof typeof CHRONIC_DISEASE_TYPE) => {
                              return <Badge>{CHRONIC_DISEASE_TYPE[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'medications',
        header: 'Medications',
        cell: ({ row }) => {
            const medications = row.getValue('medications');
            const medications_data = Array.isArray(medications) ? medications : [];
            return (
                <div className="flex gap-1 flex-wrap flex-col">
                    {medications_data.length > 0
                        ? medications_data.map((item: keyof typeof MEDICATION_TYPE) => {
                              return <Badge>{MEDICATION_TYPE[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const navigate = useNavigate();
            const id = row.original.id;

            const deleteItem = () => {
                axios
                    .delete('http://localhost:9090/medical-and-health-history/' + id, {})
                    .then((res) => {
                        toast.success(res.data.message);
                        setTimeout(() => {
                            document.location.reload();
                        }, 1000);
                    })
                    .catch((err) => toast.error(err.message));
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={deleteItem}>
                            <Trash className="text-primary" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const MedicalAndHealthHistories = ({ data }: { data: MedicalAndHealthHistory[] }) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-2 sm:flex-row-reverse flex-col">
                <Dialog>
                    <DialogTrigger className="ml-auto">
                        <Button variant="outline">
                            <Plus /> Add Medical And Health History Form
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-auto">
                        <DialogHeader>
                            <DialogTitle>Add the medical and health history form details</DialogTitle>
                            <DialogDescription>these are the basic info of the athlete</DialogDescription>
                        </DialogHeader>
                        <AddMedicalAndHealthHistoryForm />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MedicalAndHealthHistories;
