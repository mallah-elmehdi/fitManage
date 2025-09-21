import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutSessionType } from '~/lib/types';
import { getWorkoutSessionById } from '../api/workoutSession';

export interface WorkoutSessionState {
    workoutSession: WorkoutSessionType | null;
}

const initialState: WorkoutSessionState = {
    workoutSession: null,
};

const workoutSessionSlice = createSlice({
    name: 'athlete',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWorkoutSessionById.fulfilled, (state, { payload }: PayloadAction<WorkoutSessionType | null>) => {
            state.workoutSession = payload;
        });
    },
});

export const {} = workoutSessionSlice.actions;
export default workoutSessionSlice.reducer;
