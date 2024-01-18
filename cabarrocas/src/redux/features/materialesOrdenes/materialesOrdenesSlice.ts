import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

interface Material {
	id: number;
	id_orden: number;
	nombre: string;
	espesor: string;
	color: string;
	descripcion: string;
	medida_largo: number;
	medida_ancho: number;
	precio_largo: number;
	precio_m2: number;
	precio_total: number;
}

const initialState = {
	materialesOrdenes: [] as Material[],
};

export const materialesOrdenesSlice = createSlice({
	name: 'materialesOrdenes',
	initialState,
	reducers: {
		getMaterialesOrden: (state, action) => ({
			...state,
			materialesOrdenes: action.payload,
		}),
		setMaterialOrden: (state, action) => ({
			...state,
			materialesOrdenes: action.payload,
		}),
		deleteMaterialOrden: (state, action) => ({
			...state,
			materialesOrdenes: state.materialesOrdenes.filter(
				(material: Material) => material.id !== action.payload,
			),
		}),
		editMaterialOrden: (state, action) => {
			const { id, ...restProps } = action.payload;
			const existingMaterial = state.materialesOrdenes.find(
				(material: Material) => material.id === id,
			);

			if (existingMaterial) {
				const updatedMaterial = state.materialesOrdenes.map(
					(material: Material) =>
						material.id === id ? { ...material, ...restProps } : material,
				);

				return { ...state, materialesOrdenes: updatedMaterial };
			}
			const newMaterial = { id, ...restProps };

			return {
				...state,
				materialesOrdenes: [...state.materialesOrdenes, newMaterial],
			};
		},
	},
});

export const {
	setMaterialOrden,
	deleteMaterialOrden,
	getMaterialesOrden,
	editMaterialOrden,
} = materialesOrdenesSlice.actions;
export default materialesOrdenesSlice.reducer;
export const selectMaterialesOrdenes = createSelector(
	(state: any) => state.materialesOrdenes,
	materialesOrdenes => [materialesOrdenes],
);
