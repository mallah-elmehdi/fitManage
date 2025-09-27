import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { APIResponseType, MuscleImbalanceType } from '~/lib/types';
import { isLoading } from '../slices/loaderSlice';

export const URL_HOST = 'http://localhost:9090';

export const jsonDbSetUpMuscleImbalance = createAsyncThunk<
    APIResponseType<MuscleImbalanceType[]>,
    void,
    {
        rejectValue: string;
    }
>('muscleImbalance/jsonDbSetUpMuscleImbalance', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.post(`${URL_HOST}/muscle-imbalance/json-db-setup`);
        return result.data;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to fetch');
    } finally {
        dispatch(isLoading(false));
    }
});

export const getAllMuscleImbalances = createAsyncThunk<
    MuscleImbalanceType[],
    void,
    {
        rejectValue: string;
    }
>('exercise/getAllMuscleImbalances', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.get<{
            result: MuscleImbalanceType[];
        }>(`${URL_HOST}/muscle-imbalance/all`);
        return result.data.result;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to fetch');
    } finally {
        dispatch(isLoading(false));
    }
});
