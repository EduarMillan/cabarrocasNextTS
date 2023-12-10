import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import useHttpClient from '@/redux/services/http/httpClient';

import {
	deleteMaterial,
	editMaterial,
	setMaterial,
} from '@/redux/features/materiales/materialesSlice';

type Material = {
	id: number;
	nombre: string;
	descripcion: string;
	espesor: string;
	longitud_ancho: number;
	longitud_largo: number;
	calidad_material: string;
	costo_total: number;
	color: string;
	cantidad: number;
};

type Response = {
	data: Material[];
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
	 * Metodo que consulta las lineas.
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

	const createMateriales = async (material: Material) => {
		try {
			const response = (await post(
				'/materiales',
				material,
			)) as AxiosResponse<Response>;

			if (response.data) {
				dispatch(editMaterial(material));

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

	const updateMaterial = async (id: number, material: Material) => {
		try {
			const response = (await patch(
				`/materiales/${id}`,
				material,
			)) as AxiosResponse<Response>;

			if (response.data) {
				dispatch(editMaterial(material));

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
