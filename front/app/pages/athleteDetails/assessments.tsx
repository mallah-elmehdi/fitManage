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
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { deleteAssessment } from '~/context/api/assessmentApi';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import {
    FITNESS_LEVEL,
    OVERHEAD_SQUAT_POSTURE_DISTORTION,
    POSTURE_TYPE,
    PUSHING_PULLING_POSTURE_DISTORTION,
    SINGLE_SQUAT_POSTURE_DISTORTION,
    STATIC_POSTURE_DISTORTION,
} from '~/lib/enums';
import { dateFormatting } from '~/lib/funs';
import { AssessmentMuscleImbalanceType, AssessmentType } from '~/lib/types';
import AddAssessmentForm from './add_assessment_form';

export type Assessment = {
    id: number;
    muscle_imbalances: AssessmentMuscleImbalanceType[];
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
        accessorKey: 'muscle_imbalances',
        header: 'Static',
        cell: ({ row }) => {
            const muscle_imbalances: AssessmentMuscleImbalanceType[] = Array.isArray(row.getValue('muscle_imbalances'))
                ? row.getValue('muscle_imbalances')
                : [];
            const static_data: AssessmentMuscleImbalanceType[] = muscle_imbalances.filter(
                (item) => item.muscle_imbalance.posture_type === POSTURE_TYPE.STATIC
            );

            return (
                <div className="flex gap-1 wrap flex-col">
                    {static_data.length > 0
                        ? static_data.map((item) => {
                              // @ts-ignore
                              return <Badge>{STATIC_POSTURE_DISTORTION[item.muscle_imbalance.name]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'muscle_imbalances',
        header: 'Overhead squat',
        cell: ({ row }) => {
            const muscle_imbalances: AssessmentMuscleImbalanceType[] = Array.isArray(row.getValue('muscle_imbalances'))
                ? row.getValue('muscle_imbalances')
                : [];
            const static_data: AssessmentMuscleImbalanceType[] = muscle_imbalances.filter(
                (item) => item.muscle_imbalance.posture_type === POSTURE_TYPE.OVERHEAD_SQUAT
            );

            return (
                <div className="flex gap-1 wrap flex-col">
                    {static_data.length > 0
                        ? static_data.map((item) => {
                              // @ts-ignore
                              return <Badge>{OVERHEAD_SQUAT_POSTURE_DISTORTION[item.muscle_imbalance.name]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'muscle_imbalances',
        header: 'Pushing',
        cell: ({ row }) => {
            const muscle_imbalances: AssessmentMuscleImbalanceType[] = Array.isArray(row.getValue('muscle_imbalances'))
                ? row.getValue('muscle_imbalances')
                : [];
            const static_data: AssessmentMuscleImbalanceType[] = muscle_imbalances.filter(
                (item) => item.muscle_imbalance.posture_type === POSTURE_TYPE.PUSHING
            );

            return (
                <div className="flex gap-1 wrap flex-col">
                    {static_data.length > 0
                        ? static_data.map((item) => {
                              // @ts-ignore
                              return <Badge>{PUSHING_PULLING_POSTURE_DISTORTION[item.muscle_imbalance.name]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'muscle_imbalances',
        header: 'Pulling',
        cell: ({ row }) => {
            const muscle_imbalances: AssessmentMuscleImbalanceType[] = Array.isArray(row.getValue('muscle_imbalances'))
                ? row.getValue('muscle_imbalances')
                : [];
            const static_data: AssessmentMuscleImbalanceType[] = muscle_imbalances.filter(
                (item) => item.muscle_imbalance.posture_type === POSTURE_TYPE.PULLING
            );

            return (
                <div className="flex gap-1 wrap flex-col">
                    {static_data.length > 0
                        ? static_data.map((item) => {
                              // @ts-ignore
                              return <Badge>{PUSHING_PULLING_POSTURE_DISTORTION[item.muscle_imbalance.name]}</Badge>;
                          })
                        : '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'muscle_imbalances',
        header: 'Single leg squat',
        cell: ({ row }) => {
            const muscle_imbalances: AssessmentMuscleImbalanceType[] = Array.isArray(row.getValue('muscle_imbalances'))
                ? row.getValue('muscle_imbalances')
                : [];
            const static_data: AssessmentMuscleImbalanceType[] = muscle_imbalances.filter(
                (item) => item.muscle_imbalance.posture_type === POSTURE_TYPE.SINGLE_SQUAT
            );

            return (
                <div className="flex gap-1 wrap flex-col">
                    {static_data.length > 0
                        ? static_data.map((item) => {
                              // @ts-ignore
                              return <Badge>{SINGLE_SQUAT_POSTURE_DISTORTION[item.muscle_imbalance.name]}</Badge>;
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

            const handler = () => {
                dispatch(deleteAssessment({ id: id + '', athleteId: athleteId + '' }))
                    .unwrap()
                    .then((result) => {
                        toast.success(result.message);
                    })
                    .catch((error) => {
                        toast.error(error?.message || 'Failed to fetch athlete');
                    });
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
                        <DropdownMenuItem onClick={() => navigate('assessment/' + id)}>
                            <Info className="text-primary" />
                            Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handler}>
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

    const [open, setOpen] = useState(false);
    const handleDialogClose = () => setOpen(false);

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
                <Dialog open={open} onOpenChange={setOpen}>
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
                        <AddAssessmentForm handleDialogClose={handleDialogClose} />
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
