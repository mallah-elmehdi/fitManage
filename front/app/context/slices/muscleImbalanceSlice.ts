import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APIResponseType, MuscleImbalanceType } from '~/lib/types';
import { getAllMuscleImbalances, jsonDbSetUpMuscleImbalance } from '../api/muscleImbalanceApi';

export interface MuscleImbalanceState {
    muscle_imbalances: MuscleImbalanceType[];
}

const initialState: MuscleImbalanceState = {
    muscle_imbalances: [],
};

const muscleImbalanceSlice = createSlice({
    name: 'muscleImbalance',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(jsonDbSetUpMuscleImbalance.fulfilled, (state, { payload }: PayloadAction<APIResponseType<MuscleImbalanceType[]>>) => {
                state.muscle_imbalances = payload.result;
            })
            .addCase(getAllMuscleImbalances.fulfilled, (state, { payload }: PayloadAction<MuscleImbalanceType[]>) => {
                state.muscle_imbalances = payload;
            });
    },
});

export const {} = muscleImbalanceSlice.actions;
export default muscleImbalanceSlice.reducer;
