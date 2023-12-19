import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import useHttpClient from '@/redux/services/http/httpClient';

import {
	deleteMaterial,
	setMaterial,
} from '@/redux/features/materiales/materialesSlice';

type Inputs = {
	longitud_ancho: string;
	cantidad: string;
	color: string;
	costo_total: string;
	descripcion: string;
	espesor: string;
	longitud_largo: string;
	nombre: string;
};

type Response = {
	data: Inputs[];
};

/**
 * CustomHook para los servicios de materiales.
 *
 * @returns Funciones de materiales.
 */
export default function useMateriales() {
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
	 * Metodo que consulta los materiales.
	 *
	 */

	const getMateriales = async () => {
		try {
			const response = (await get('/materiales')) as AxiosResponse<Response>;
			if (response.data) {
				dispatch(setMaterial(response.data));
			}
		} catch (error) {
			throw new Error('Error durante la consulta de los materiales');
		}
	};

	/**
	 * Metodo que elimina un materiales mediante id.
	 *
	 */

	const deleteMaterialById = async (id: number) => {
		try {
			const response = (await del(
				`/materiales/${id}`,
			)) as AxiosResponse<Response>;

			if (response.data) {
				dispatch(deleteMaterial(id));

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
	 * Metodo que crea un material.
	 *
	 */

	const createMateriales = async (material: Inputs) => {
		try {
			const response = (await post(
				'/materiales',
				material,
			)) as AxiosResponse<Response>;

			if (response.data) {
				getMateriales();

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
	 * Metodo que actualiza  un material por su id.
	 *
	 */

	const updateMaterial = async (id: number, material: Inputs) => {
		try {
			const response = (await patch(
				`/materiales/${id}`,
				material,
			)) as AxiosResponse<Response>;

			if (response.data) {
				getMateriales();

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

			throw new Error('Error al actualizar la linea');
		}
	};

	return {
		getMateriales,
		deleteMaterialById,
		createMateriales,
		updateMaterial,
	};
}
