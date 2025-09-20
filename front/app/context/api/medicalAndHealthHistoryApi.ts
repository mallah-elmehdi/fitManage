import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { MedicalAndHealthHistoryType } from '~/lib/types';
import { isLoading } from '../slices/loaderSlice';
import { URL_HOST, getAthleteById } from './athleteApi';

export const deleteMedicalAndHealthHistory = createAsyncThunk<
    MedicalAndHealthHistoryType,
    { id: string; athleteId: string },
    {
        rejectValue: string;
    }
>('medicalAndHealthHistory/deleteMedicalAndHealthHistory', async ({ id, athleteId }, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.delete<{ result: MedicalAndHealthHistoryType }>(`${URL_HOST}/medical-and-health-history/${id}`);
        dispatch(getAthleteById(athleteId));
        return result.data.result;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'delete medical and health history error');
    } finally {
        dispatch(isLoading(false));
    }
});
