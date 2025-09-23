import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllExercisesDataType } from '~/pages/exercises/exercises-list';
import { getAllExercises } from '../api/exerciseApi';

export interface ExerciseState {
    exercises: AllExercisesDataType;
}

const initialState: ExerciseState = {
    exercises: {
        exercises: [],
        currentPage: 1,
        totalPages: 0,
    },
};

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllExercises.fulfilled, (state, { payload }: PayloadAction<AllExercisesDataType>) => {
            state.exercises = payload;
        });
    },
});

export const {} = exerciseSlice.actions;
export default exerciseSlice.reducer;
