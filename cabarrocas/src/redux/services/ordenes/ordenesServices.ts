import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import useHttpClient from '@/redux/services/http/httpClient';

import { deleteOrden, setOrden } from '@/redux/features/ordenes/ordenesSlice';

type Inputs = {
	nombre: string;
	descripcion: string;
	pago_efectivo: string;
	precio: string;
	fecha: string;
	otros_gastos_descripcion: string;
	costo_otros_gastos: string;
	impuesto_representacion: string;
	impuesto_onat: string;
	impuesto_equipos: string;
	costo_total: string;
	utilidad: string;
	facturado: string;
	entidad: string;
};

type Response = {
	data: Inputs[];
};

/**
 * CustomHook para los servicios de ordenes.
 *
 * @returns Funciones de ordenes.
 */
export default function useOrdenes() {
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
	 * Metodo que consulta los ordenes.
	 *
	 */

	const getOrdenes = async (): Promise<AxiosResponse<Response>> => {
		try {
			const response = (await get('/ordenes')) as AxiosResponse<Response>;
			if (response.data) {
				dispatch(setOrden(response.data));
			}
			return response;
		} catch (error) {
			toast.error('Error al obtener las órdenes', {
				duration: 2000,
				position: 'top-right',
			});
			throw error;
		}
	};

	/**
	 * Metodo que elimina una orden mediante id.
	 *
	 */

	const deleteOrdenById = async (id: number) => {
		try {
			const response = (await del(`/ordenes/${id}`)) as AxiosResponse<Response>;

			if (response.data) {
				dispatch(deleteOrden(id));

				toast.success('La orden se ha eliminado satisfactoriamente', {
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
	 * Metodo que crea una orden.
	 *
	 */

	const createOrden = async (orden: Inputs) => {
		try {
			const response = (await post(
				'/ordenes',
				orden,
			)) as AxiosResponse<Response>;

			if (response.data) {
				getOrdenes();

				toast.success('La orden se ha creado satisfactoriamente', {
					duration: 2000,
					position: 'top-right',
				});
			}
		} catch (error) {
			toast.error('Ha ocurrido un error. Por favor intente de nuevo', {
				duration: 2000,
				position: 'top-right',
			});

			throw new Error('Error al registrar la orden');
		}
	};

	/**
	 * Metodo que actualiza  una orden por su id.
	 *
	 */

	const updateOrden = async (id: number, orden: Inputs) => {
		try {
			const response = (await patch(
				`/ordenes/${id}`,
				orden,
			)) as AxiosResponse<Response>;

			if (response.data) {
				getOrdenes();

				toast.success('La orden se ha actualizado satisfactoriamente', {
					duration: 2000,
					position: 'top-right',
				});
			}
		} catch (error) {
			toast.error('Ha ocurrido un error. Por favor intente de nuevo', {
				duration: 2000,
				position: 'top-right',
			});

			throw new Error('Error al actualizar la orden');
		}
	};

	return {
		getOrdenes,
		deleteOrdenById,
		createOrden,
		updateOrden,
	};
}
