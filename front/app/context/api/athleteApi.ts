import { Dispatch, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { isLoading } from '../slices/loaderSlice';
import { APIResponseType, AthleteType } from '~/lib/types';
import { AthleteInitFormValues } from '~/pages/athletes/add_athlete_form';

export const URL_HOST = 'http://localhost:9090';

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
    AthleteType[],
    void,
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

export const createInitAthlete = createAsyncThunk<
    APIResponseType<AthleteType>,
    AthleteInitFormValues,
    {
        rejectValue: string;
    }
>('athlete/createInitAthlete', async (data, { dispatch, rejectWithValue }) => {
    try {
        dispatch(isLoading(true));
        const result = await axios.post<APIResponseType<AthleteType>>(`${URL_HOST}/athlete/init`, data);
        dispatch(getAllAthletes());
        return result.data;
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return rejectWithValue(error.message || 'Failed to create athlete');
    } finally {
        dispatch(isLoading(false));
    }
});
