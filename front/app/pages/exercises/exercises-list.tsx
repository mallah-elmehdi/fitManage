import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import ExerciseCard from '~/components/exercise-card';
import { Input } from '~/components/ui/input';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '~/components/ui/pagination';
import { getAllExercises } from '~/context/api/exerciseApi';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import { ExerciseFormatType } from '~/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { FITNESS_LEVEL, MUSCLE, TRAINING_FOCUS, TRAINING_PHASE } from '~/lib/enums';
import { setQuarter } from 'date-fns';
import { TypographyP } from '~/components/ui/typography';

export type AllExercisesDataType = {
    totalPages: number;
    currentPage: number;
    totalExercises: number;
    exercises: ExerciseFormatType[];
};

export type QueryStringDataType = {
    page?: string;
    name?: string;
    fitness_level?: FITNESS_LEVEL;
};

const ExercisesList = () => {
    const dispatch = useAppDispatch();
    const { exercises } = useAppSelector((state) => state.exercise);

    const [search, setSearch] = useState<string>('');
    const debouncedSearchName = useDebounce(search, 500);

    const [page, setPage] = useState<string>('1');
    const [fitness_level, setFitnessLevel] = useState<string | null>(null);
    const [training_phases, setTrainingPhases] = useState<string | null>(null);
    const [primary_muscles, setPrimaryMuscles] = useState<string | null>(null);
    const [secondary_muscles, setSecondaryMuscles] = useState<string | null>(null);
    const [focus, setFocus] = useState<string | null>(null);

    useEffect(() => {
        dispatch(
            getAllExercises({
                page,
                name: debouncedSearchName,
                fitness_level,
                training_phases,
                primary_muscles,
                secondary_muscles,
                focus,
            })
        )
            .unwrap()
            .catch((error) => {
                toast.error(error?.message || 'Failed to fetch');
            });
    }, [dispatch, page, debouncedSearchName, fitness_level, training_phases, primary_muscles, secondary_muscles, focus]);

    return (
        <div className="flex flex-col gap-3">
            <Input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search " className="sm:w-[50%]" />
            <div className="flex items-center gap-3 flex-wrap">
                <Select
                    onValueChange={(newValue) => {
                        const fit = Object.entries(FITNESS_LEVEL).find((item) => item[1] === newValue);
                        console.log('fit', fit);
                        setFitnessLevel(fit ? fit[0] : null);
                    }}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Fitness level" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(FITNESS_LEVEL).map(([key, val]) => (
                            <SelectItem key={key} value={val}>
                                {val}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(newValue) => {
                        const fit = Object.entries(TRAINING_PHASE).find((item) => item[1] === newValue);
                        console.log('fit', fit);
                        setTrainingPhases(fit ? fit[0] : null);
                    }}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Training phase" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(TRAINING_PHASE).map(([key, val]) => (
                            <SelectItem key={key} value={val}>
                                {val}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(newValue) => {
                        const fit = Object.entries(MUSCLE).find((item) => item[1] === newValue);
                        setPrimaryMuscles(fit ? fit[0] : null);
                    }}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Primary muscles" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(MUSCLE).map(([key, val]) => (
                            <SelectItem key={key} value={val}>
                                {val}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(newValue) => {
                        const fit = Object.entries(MUSCLE).find((item) => item[1] === newValue);
                        setSecondaryMuscles(fit ? fit[0] : null);
                    }}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Secondary muscles" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(MUSCLE).map(([key, val]) => (
                            <SelectItem key={key} value={val}>
                                {val}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(newValue) => {
                        const fit = Object.entries(TRAINING_FOCUS).find((item) => item[1] === newValue);
                        setFocus(fit ? fit[0] : null);
                    }}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Focus" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(TRAINING_FOCUS).map(([key, val]) => (
                            <SelectItem key={key} value={val}>
                                {val}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <TypographyP className="text-xs font-bold">Total: {exercises.totalExercises}</TypographyP>

            <div className="grid grid-cols-3 gap-3">
                {exercises &&
                    exercises.exercises.map((exercise) => (
                        <div className="col-span-1 ">
                            <ExerciseCard exercise={exercise} />
                        </div>
                    ))}
            </div>

            {exercises && (
                <Pagination>
                    <PaginationContent>
                        {exercises.currentPage === Math.ceil(exercises.totalPages / 10) && (
                            <>
                                <PaginationItem>
                                    <PaginationLink onClick={() => setPage('1')}>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            </>
                        )}
                        {exercises.currentPage !== 1 && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setPage(exercises.currentPage - 1 + '')}>
                                    {exercises.currentPage - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink isActive>{exercises.currentPage}</PaginationLink>
                        </PaginationItem>
                        {exercises.currentPage < exercises.totalPages && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setPage(exercises.currentPage + 1 + '')}>
                                    {exercises.currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {exercises.totalPages !== exercises.currentPage && (
                            <>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink onClick={() => setPage(exercises.totalPages + '')}>
                                        {exercises.totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default ExercisesList;
