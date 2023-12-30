import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

interface Orden {
	id: number;
	nombre: string;
	descripcion: string;
	pago_efectivo: number;
	precio: number;
	fecha: Date;
	otros_gastos_descripcion: string;
	costo_otros_gastos: number;
	impuesto_representacion: number;
	impuesto_onat: number;
	impuesto_equipos: number;
	costo_total: number;
	utilidad: number;
	facturado: number;
	entidad: string;
}

const initialState = {
	ordenes: [] as Orden[],
};

export const ordenesSlice = createSlice({
	name: 'ordenes',
	initialState,
	reducers: {
		getOrdenes: (state, action) => ({
			...state,
			ordenes: action.payload,
		}),
		setOrden: (state, action) => ({ ...state, ordenes: action.payload }),
		deleteOrden: (state, action) => ({
			...state,
			ordenes: state.ordenes.filter(
				(orden: Orden) => orden.id !== action.payload,
			),
		}),
		editOrden: (state, action) => {
			const { id, ...restProps } = action.payload;
			const existingOrden = state.ordenes.find(
				(orden: Orden) => orden.id === id,
			);

			if (existingOrden) {
				const updatedOrden = state.ordenes.map((orden: Orden) =>
					orden.id === id ? { ...orden, ...restProps } : orden,
				);

				return { ...state, ordenes: updatedOrden };
			}
			const newOrden = { id, ...restProps };

			return { ...state, ordenes: [...state.ordenes, newOrden] };
		},
	},
});

export const { setOrden, deleteOrden, getOrdenes, editOrden } =
	ordenesSlice.actions;
export default ordenesSlice.reducer;
export const selectOrdenes = createSelector(
	(state: any) => state.ordenes,
	ordenes => [ordenes],
);
