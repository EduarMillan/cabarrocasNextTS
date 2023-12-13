import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

interface Material {
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
	materiales: [] as Material[],
};

export const materialesSlice = createSlice({
	name: 'materiales',
	initialState,
	reducers: {
		getMateriales: (state, action) => ({
			...state,
			materiales: action.payload,
		}),
		setMaterial: (state, action) => ({ ...state, materiales: action.payload }),
		deleteMaterial: (state, action) => ({
			...state,
			materiales: state.materiales.filter(
				(material: Material) => material.id !== action.payload,
			),
		}),
		editMaterial: (state, action) => {
			const { id, ...restProps } = action.payload;
			const existingMaterial = state.materiales.find(
				(material: Material) => material.id === id,
			);

			if (existingMaterial) {
				const updatedMaterial = state.materiales.map((material: Material) =>
					material.id === id ? { ...material, ...restProps } : material,
				);

				return { ...state, materiales: updatedMaterial };
			}
			const newMaterial = { id, ...restProps };

			return { ...state, materiales: [...state.materiales, newMaterial] };
		},
	},
});

export const { setMaterial, deleteMaterial, getMateriales, editMaterial } =
	materialesSlice.actions;
export default materialesSlice.reducer;
export const selectMateriales = createSelector(
	(state: any) => state.materiales,
	materiales => [materiales],
);
