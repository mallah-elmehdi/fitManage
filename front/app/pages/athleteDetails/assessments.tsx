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
import { Info, MoreHorizontal, Plus, Trash } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import {
    FITNESS_LEVEL,
    OVERHEAD_SQUAT_POSTURE_DISTORTION,
    PUSHING_PULLING_POSTURE_DISTORTION,
    SINGLE_SQUAT_POSTURE_DISTORTION,
    STATIC_POSTURE_DISTORTION,
} from '~/lib/enums';
import { dateFormatting } from '~/lib/funs';
import AddAssessmentForm from './add_assessment_form';
import axios from 'axios';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import { AssessmentType } from '~/lib/types';
import { deleteAssessment } from '~/context/api/assessmentApi';
import { useParams } from 'react-router';

export type Assessment = {
    id: number;
    static: STATIC_POSTURE_DISTORTION[];
    overhead_squat: OVERHEAD_SQUAT_POSTURE_DISTORTION[];
    pushing: PUSHING_PULLING_POSTURE_DISTORTION[];
    pulling: PUSHING_PULLING_POSTURE_DISTORTION[];
    single_leg_squat: SINGLE_SQUAT_POSTURE_DISTORTION[];
    fitness_level?: FITNESS_LEVEL | null;
    createdAt: string;
};

export const columns: ColumnDef<AssessmentType>[] = [
    {
        accessorKey: 'createdAt',
        header: 'Assessment date',
        cell: ({ row }) => <div className="capitalize">{dateFormatting(row.getValue('createdAt'))}</div>,
    },
    {
        accessorKey: 'static',
        header: 'Static',
        cell: ({ row }) => {
            const _static = row.getValue('static');
            const static_data = Array.isArray(_static) ? _static : [];
            return (
                <div className="flex gap-1 wrap flex-col">
                    {static_data.length > 0
                        ? static_data.map((item: keyof typeof STATIC_POSTURE_DISTORTION) => {
                              return <Badge>{STATIC_POSTURE_DISTORTION[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'overhead_squat',
        header: 'Overhead squat',
        cell: ({ row }) => {
            const overhead_squat = row.getValue('overhead_squat');
            const overhead_squat_data = Array.isArray(overhead_squat) ? overhead_squat : [];
            return (
                <div className="flex gap-1 wrap flex-col">
                    {overhead_squat_data.length > 0
                        ? overhead_squat_data.map((item: keyof typeof OVERHEAD_SQUAT_POSTURE_DISTORTION) => {
                              return <Badge>{OVERHEAD_SQUAT_POSTURE_DISTORTION[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'pushing',
        header: 'Pushing',
        cell: ({ row }) => {
            const pushing = row.getValue('pushing');
            const pushing_data = Array.isArray(pushing) ? pushing : [];
            return (
                <div className="flex gap-1 wrap flex-col">
                    {pushing_data.length > 0
                        ? pushing_data.map((item: keyof typeof PUSHING_PULLING_POSTURE_DISTORTION) => {
                              return <Badge>{PUSHING_PULLING_POSTURE_DISTORTION[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'pulling',
        header: 'Pulling',
        cell: ({ row }) => {
            const pulling = row.getValue('pulling');
            const pulling_data = Array.isArray(pulling) ? pulling : [];
            return (
                <div className="flex gap-1 wrap flex-col">
                    {pulling_data.length > 0
                        ? pulling_data.map((item: keyof typeof PUSHING_PULLING_POSTURE_DISTORTION) => {
                              return <Badge>{PUSHING_PULLING_POSTURE_DISTORTION[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'single_leg_squat',
        header: 'Single leg squat',
        cell: ({ row }) => {
            const single_leg_squat = row.getValue('single_leg_squat');
            const single_leg_squat_data = Array.isArray(single_leg_squat) ? single_leg_squat : [];
            return (
                <div className="flex gap-1 wrap flex-col">
                    {single_leg_squat_data.length > 0
                        ? single_leg_squat_data.map((item: keyof typeof SINGLE_SQUAT_POSTURE_DISTORTION) => {
                              return <Badge>{SINGLE_SQUAT_POSTURE_DISTORTION[item]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'fitness_level',
        header: 'Fitness Level',
        cell: ({ row }) => {
            const fitness_level: keyof typeof FITNESS_LEVEL = row.getValue('fitness_level');
            return <Badge>{FITNESS_LEVEL[fitness_level]}</Badge>;
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const navigate = useNavigate();
            const id = row.original.id;
            const dispatch = useAppDispatch();
            const { athleteId } = useParams();

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
                        <DropdownMenuItem onClick={() => navigate('assessment/' + id)}>
                            <Info className="text-primary" />
                            Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => dispatch(deleteAssessment({ id: id + '', athleteId: athleteId + '' }))}>
                            <Trash className="text-primary" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Assessments = () => {
    const { athlete } = useAppSelector((state) => state.athlete);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: athlete?.assessments || [],
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
                            <Plus /> Add Assessment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-auto h-full">
                        <DialogHeader>
                            <DialogTitle>Add the assessment details</DialogTitle>
                            <DialogDescription>these are the basic info of the athlete</DialogDescription>
                        </DialogHeader>
                        <AddAssessmentForm />
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

export default Assessments;
