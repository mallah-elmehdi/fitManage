import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AssessmentType } from '~/lib/types';
import { isLoading } from '../slices/loaderSlice';
import { URL_HOST, getAthleteById } from './athleteApi';

export const deleteAssessment = createAsyncThunk<
    AssessmentType,
    { id: string; athleteId: string },
    {
        rejectValue: string;
    }
>('assessment/deleteAssessment', async ({ id, athleteId }, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.delete<{ result: AssessmentType }>(`${URL_HOST}/assessment/${id}`);
        dispatch(getAthleteById(athleteId));
        return result.data.result;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'delete assessment error');
    } finally {
        dispatch(isLoading(false));
    }
});
