import { configureStore } from '@reduxjs/toolkit';
import { materialesSlice } from '../features/materiales/materialesSlice';
import { ordenesSlice } from '../features/ordenes/ordenesSlice';

export const store = configureStore({
	reducer: {
		materiales: materialesSlice.reducer,
		ordenes: ordenesSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
