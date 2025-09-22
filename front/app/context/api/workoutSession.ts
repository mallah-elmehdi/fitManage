// Arg type: number (athleteId)

import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorkoutSessionType } from '~/lib/types';
import { isLoading } from '../slices/loaderSlice';
import axios, { AxiosError } from 'axios';
import { URL_HOST } from './athleteApi';

// Reject type: string (error message)
export const getWorkoutSessionById = createAsyncThunk<
    WorkoutSessionType | null, // ✅ return type
    string, // ✅ argument type (athleteId)
    {
        rejectValue: string;
    }
>('workoutSession/getWorkoutSessionById', async (id, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.get<{ result: WorkoutSessionType | null }>(`${URL_HOST}/workout-session/${id}`);
        return result.data.result;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to fetch workout session');
    } finally {
        dispatch(isLoading(false));
    }
});

// Reject type: string (error message)
export const getAllWorkoutSessions = createAsyncThunk<
    WorkoutSessionType[], // ✅ return type
    { monthIndex: string }, // ✅ argument type (athleteId)
    {
        rejectValue: string;
    }
>('workoutSession/getAllWorkoutSessions', async ({ monthIndex }, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.get<{ result: WorkoutSessionType[] }>(`${URL_HOST}/workout-session/all?monthIndex=${monthIndex}`);
        return result.data.result;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to fetch workout session');
    } finally {
        dispatch(isLoading(false));
    }
});
