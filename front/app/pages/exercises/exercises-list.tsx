import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import ExerciseCard from '~/components/exercise-card';
import { Input } from '~/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
} from '~/components/ui/pagination';
import { ExerciseFormatType } from '~/lib/types';

type DataType = {
    totalPages: number;
    currentPage: number;
    exercises: ExerciseFormatType[];
};

const ExercisesList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<DataType | undefined>(undefined);

    const setThePageNumber = (page: string) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('page', page);
            return newParams;
        });
    };

    const page = searchParams.get('page');
    if (!page) setThePageNumber('1');

    useEffect(() => {
        if (page)
            axios
                .get(`http://localhost:9090/exercise/all?page=${page}`)
                .then((results) => {
                    setData(results.data.result);
                    toast.success(results.data.message);
                })
                .catch((error) => {
                    toast.error(error.message);
                })
                .finally(() => {});
    }, [page]);

    return (
        <div className="flex flex-col gap-3">
            <Input placeholder="Search" />

            <div className="grid grid-cols-3 gap-3">
                {data &&
                    data.exercises.map((exe) => (
                        <div className="col-span-1 ">
                            <ExerciseCard {...exe} />
                        </div>
                    ))}
            </div>

            {data && (
                <Pagination>
                    <PaginationContent>
                        {data.currentPage > 1 && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setThePageNumber(data.currentPage - 1 + '')}>
                                    {data.currentPage - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink isActive>{data.currentPage}</PaginationLink>
                        </PaginationItem>
                        {data.currentPage < data.totalPages && (
                            <PaginationItem>
                                <PaginationLink onClick={() => setThePageNumber(data.currentPage + 1 + '')}>
                                    {data.currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {data.totalPages !== data.currentPage && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default ExercisesList;
