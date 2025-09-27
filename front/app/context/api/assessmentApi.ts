import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { APIResponseType, AssessmentType } from '~/lib/types';
import { isLoading } from '../slices/loaderSlice';
import { URL_HOST, getAthleteById } from './athleteApi';
import { AssessmentFormValues } from '~/pages/athleteDetails/add_assessment_form';

export const createAssessment = createAsyncThunk<
    APIResponseType<AssessmentType>,
    { data: AssessmentFormValues; athleteId: string },
    {
        rejectValue: string;
    }
>('assessment/createAssessment', async ({ data, athleteId }, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.post<APIResponseType<AssessmentType>>(`${URL_HOST}/assessment`, data);
        dispatch(getAthleteById(athleteId));
        return result.data;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to create assessment');
    } finally {
        dispatch(isLoading(false));
    }
});

export const deleteAssessment = createAsyncThunk<
    APIResponseType<AssessmentType>,
    { id: string; athleteId: string },
    {
        rejectValue: string;
    }
>('assessment/deleteAssessment', async ({ id, athleteId }, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.delete(`${URL_HOST}/assessment/${id}`);
        dispatch(getAthleteById(athleteId));
        return result.data;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'delete assessment error');
    } finally {
        dispatch(isLoading(false));
    }
});
