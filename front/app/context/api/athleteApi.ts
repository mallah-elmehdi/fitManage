import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { isLoading } from '../slices/loaderSlice';
import { AthleteType } from '~/lib/types';

export const URL_HOST = 'http://localhost:9090';

// Return type: Athlete
// Arg type: number (athleteId)
// Reject type: string (error message)
export const getAthleteById = createAsyncThunk<
    AthleteType | null, // ✅ return type
    string, // ✅ argument type (athleteId)
    {
        rejectValue: string;
    }
>('athlete/getAthleteById', async (athleteId, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.get<{ result: AthleteType | null }>(`${URL_HOST}/athlete/${athleteId}`);
        return result.data.result;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to fetch athlete');
    } finally {
        dispatch(isLoading(false));
    }
});

export const getAllAthletes = createAsyncThunk<
    AthleteType[], // ✅ return type
    void, // ✅ argument type (athleteId)
    {
        rejectValue: string;
    }
>('athlete/getAllAthletes', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.get<{ result: AthleteType[] }>(`${URL_HOST}/athlete/all`);
        return result.data.result;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to fetch athlete');
    } finally {
        dispatch(isLoading(false));
    }
});

