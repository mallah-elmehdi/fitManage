import { combineReducers, UnknownAction } from '@reduxjs/toolkit';
import athlete from './slices/athleteSlice';
import loader from './slices/loaderSlice';
import toast from './slices/toastSlice';
import workoutSession from './slices/workoutSessionSlice';
import exercise from './slices/exerciseSlice';

const appReducer = combineReducers({
    athlete,
    loader,
    toast,
    workoutSession,
    exercise,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: UnknownAction): RootState => {
    if (action.type === 'RESET') {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
