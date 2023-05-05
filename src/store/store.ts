import { configureStore } from '@reduxjs/toolkit';

import { productsApi } from './api/productsApi';
import productsSliceReducer from './slices/productsSlice';

export const store = configureStore({
    reducer: {
        productsSlice: productsSliceReducer,
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
