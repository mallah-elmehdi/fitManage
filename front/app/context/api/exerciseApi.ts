import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AllExercisesDataType } from '~/pages/exercises/exercises-list';
import { isLoading } from '../slices/loaderSlice';

export const URL_HOST = 'http://localhost:9090';

type SearchAllExerciseType = {
    page: string;
    name?: string | null;
    fitness_level?: string | null;
    training_phases?: string | null;
    primary_muscles?: string | null;
    secondary_muscles?: string | null;
    focus?: string | null;
};

export const getAllExercises = createAsyncThunk<
    AllExercisesDataType,
    SearchAllExerciseType,
    {
        rejectValue: string;
    }
>(
    'exercise/getAllExercises',
    async ({ page, name, fitness_level, training_phases, primary_muscles, secondary_muscles, focus }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(isLoading(true));
            const result = await axios.get<{
                result: AllExercisesDataType;
            }>(
                `${URL_HOST}/exercise/all?page=${page}&name=${name || ''}&fitness_level=${fitness_level || ''}&training_phases=${training_phases || ''}&primary_muscles=${primary_muscles || ''}&secondary_muscles=${secondary_muscles || ''}&focus=${focus || ''}`
            );
            return result.data.result;
        } catch (err) {
            const error: AxiosError = err as AxiosError;
            return rejectWithValue(error.message || 'Failed to fetch');
        } finally {
            dispatch(isLoading(false));
        }
    }
);

export const jsonDbSetUpExercises = createAsyncThunk<
    void,
    void,
    {
        rejectValue: string;
    }
>('exercise/jsonDbSetUpExercises', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        await axios.post<{
            result: AllExercisesDataType;
        }>(`${URL_HOST}/exercise/json-db-setup`);
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to fetch');
    } finally {
        dispatch(isLoading(false));
    }
});
