import { useDispatch } from 'react-redux';

import toast from 'react-hot-toast';
import useHttpClient from '@/redux/services/http/httpClient';

import {
	deleteMaterial,
	editMaterial,
	setMaterial,
} from '@/redux/features/materiales/materialesSlice';

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
			const response = await get('/materiales');

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

	const deleteMaterialById = async id => {
		try {
			const response = await del(`/materiales/${id}`);

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

	const createMateriales = async material => {
		try {
			const response = await post('/materiales', material);

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

	const updateMaterial = async (id, material) => {
		try {
			const response = await patch(`/materiales/${id}`, material);

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
