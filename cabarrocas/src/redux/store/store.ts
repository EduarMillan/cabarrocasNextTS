import { configureStore } from '@reduxjs/toolkit';
import { materialesSlice } from '../features/materiales/materialesSlice';
import { ordenesSlice } from '../features/ordenes/ordenesSlice';
import { materialesOrdenesSlice } from '../features/materialesOrdenes/materialesOrdenesSlice';

export const store = configureStore({
	reducer: {
		ordenes: ordenesSlice.reducer,
		materiales: materialesSlice.reducer,
		materialesOrdenes: materialesOrdenesSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
