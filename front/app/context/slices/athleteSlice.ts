import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AthleteType } from '~/lib/types';
import { getAllAthletes, getAthleteById } from '../api/athleteApi';

export interface AthleteState {
    athlete: AthleteType | null;
    athletes: AthleteType[];
}

const initialState: AthleteState = {
    athlete: null,
    athletes: [],
};

const athleteSlice = createSlice({
    name: 'athlete',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAthleteById.fulfilled, (state, { payload }: PayloadAction<AthleteType | null>) => {
                state.athlete = payload;
            })
            .addCase(getAllAthletes.fulfilled, (state, { payload }: PayloadAction<AthleteType[]>) => {
                state.athletes = payload;
            });
    },
});

export const {} = athleteSlice.actions;
export default athleteSlice.reducer;
