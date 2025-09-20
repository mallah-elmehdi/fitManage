import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type LoaderState = {
    is_loading: boolean;
};

const initialState: LoaderState = {
    is_loading: false,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        isLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.is_loading = payload;
        },
    },
});

export const { isLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
