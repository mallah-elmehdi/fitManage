import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutSessionType } from '~/lib/types';
import { getAllWorkoutSessions, getWorkoutSessionById } from '../api/workoutSession';

export interface WorkoutSessionState {
    workoutSession: WorkoutSessionType | null;
    workoutSessions: WorkoutSessionType[];
}

const initialState: WorkoutSessionState = {
    workoutSession: null,
    workoutSessions: [],
};

const workoutSessionSlice = createSlice({
    name: 'workingSession',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWorkoutSessionById.fulfilled, (state, { payload }: PayloadAction<WorkoutSessionType | null>) => {
                state.workoutSession = payload;
            })
            .addCase(getAllWorkoutSessions.fulfilled, (state, { payload }: PayloadAction<WorkoutSessionType[]>) => {
                state.workoutSessions = payload;
            });
    },
});

export const {} = workoutSessionSlice.actions;
export default workoutSessionSlice.reducer;
