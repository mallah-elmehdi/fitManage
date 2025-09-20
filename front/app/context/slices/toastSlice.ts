import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ToastState = {
    message: string;
    severity: 'error' | 'success' | null;
};

const initialState: ToastState = {
    message: '',
    severity: null,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, { payload }: PayloadAction<ToastState>) => {
            state.message = payload.message;
            state.severity = payload.severity;
        },
    },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
