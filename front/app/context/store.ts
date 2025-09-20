import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
});

export { store };

// --- Types ---
export type AppDispatch = typeof store.dispatch;
