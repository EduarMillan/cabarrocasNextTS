import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import useHttpClient from '@/redux/services/http/httpClient';

import {
	deleteMaterialOrden,
	setMaterialOrden,
} from '@/redux/features/materialesOrdenes/materialesOrdenesSlice';

type Inputs = {
	medida_ancho: string;
	color: string;
	precio_total: string;
	descripcion: string;
	espesor: string;
	medida_largo: string;
	nombre: string;
	id_orden: string;
	precio_largo: string;
	precio_m2: string;
};

type Response = {
	data: Inputs[];
};

/**
 * CustomHook para los servicios de materialesOrdenes.
 *
 * @returns Funciones de materialesOrdenes.
 */
export default function useMaterialesOrdenes() {
	/*
	 * ==========================
	 * Definición de custom Hooks
	 * ==========================
	 */

	const { get, del, post, patch } = useHttpClient();

	/*
	 * ==========================
	 * Definición de hooks de react
	 * ==========================
	 */

	const dispatch = useDispatch();

	/*
	 * ==========================
	 * Funciones
	 * ==========================
	 */

	/**
	 * Metodo que consulta los materialesOrdenes.
	 *
	 */

	const getMaterialesOrdenes = async () => {
		try {
			const response = (await get(
				'/materiales_Ordenes',
			)) as AxiosResponse<Response>;

			if (response.data) {
				dispatch(setMaterialOrden(response.data));
			}
		} catch (error) {
			throw new Error(
				'Error durante la consulta de los materiales de la orden',
			);
		}
	};

	/**
	 * Metodo que elimina un material de la orden mediante id.
	 *
	 */

	const deleteMaterialOrdenById = async (id: number) => {
		try {
			const response = (await del(
				`/materialestrabajosrealizados/${id}`,
			)) as AxiosResponse<Response>;

			if (response.data) {
				dispatch(deleteMaterialOrden(id));

				toast.success('El material se ha eliminado satisfactoriamente', {
					duration: 2000,
					position: 'top-right',
				});
			}
		} catch (error) {
			toast.error('Ha ocurrido un error. Por favor intente de nuevo', {
				duration: 2000,
				position: 'top-right',
			});

			throw new Error('Error al eliminar');
		}
	};

	/**
	 * Metodo que crea un material de la orden.
	 *
	 */

	const createMaterialesOrden = async (material: Inputs) => {
		try {
			const response = (await post(
				'/materialestrabajosrealizados',
				material,
			)) as AxiosResponse<Response>;

			if (response.data) {
				getMaterialesOrdenes();

				toast.success('El material se ha creado satisfactoriamente', {
					duration: 2000,
					position: 'top-right',
				});
			}
		} catch (error) {
			toast.error('Ha ocurrido un error. Por favor intente de nuevo', {
				duration: 2000,
				position: 'top-right',
			});

			throw new Error('Error al guardar el material');
		}
	};

	/**
	 * Metodo que actualiza  un material de la orden por su id.
	 *
	 */

	const updateMaterialOrden = async (id: number, material: Inputs) => {
		try {
			const response = (await patch(
				`/materialestrabajosrealizados/${id}`,
				material,
			)) as AxiosResponse<Response>;

			if (response.data) {
				getMaterialesOrdenes();

				toast.success('El material se ha actualizado satisfactoriamente', {
					duration: 2000,
					position: 'top-right',
				});
			}
		} catch (error) {
			toast.error('Ha ocurrido un error. Por favor intente de nuevo', {
				duration: 2000,
				position: 'top-right',
			});

			throw new Error('Error al actualizar el material');
		}
	};

	return {
		getMaterialesOrdenes,
		deleteMaterialOrdenById,
		createMaterialesOrden,
		updateMaterialOrden,
	};
}
