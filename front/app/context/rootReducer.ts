import { combineReducers, UnknownAction } from '@reduxjs/toolkit';
import athleteSlice from './slices/athleteSlice';
import loaderSlice from './slices/loaderSlice';
import toastSlice from './slices/toastSlice';

const appReducer = combineReducers({
    athlete: athleteSlice,
    loader: loaderSlice,
    toast: toastSlice,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: UnknownAction): RootState => {
    if (action.type === 'RESET') {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
