'use client';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem } from '@mui/material';
import PrimaryButton from '@/components/utils/PrimaryButton';
import SecondaryButton from '@/components/utils/SecondaryButton';
import useOrdenes from '@/redux/services/ordenes/ordenesServices';
import { ordenSchema, mappedEntidad } from '@/validations/OrdenesSchema';
import moment from 'moment';

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

/**
 * Renders a form for selecting ordenes and their properties.
 *
 * @return {JSX.Element} The rendered form component.
 */
function FormOrdenes({ onCancel, orden }: any) {
	const { createOrden, updateOrden } = useOrdenes();

	const fechaActual = new Date();
	const fechaActualFormat = fechaActual.toISOString().slice(0, 16);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(ordenSchema),
	});

	const entidadOptions = Object.entries(mappedEntidad).map(([key, value]) => (
		<MenuItem key={key} value={value}>
			{value}
		</MenuItem>
	));

	useEffect(() => {
		if (orden) {
			setValue('nombre', orden.nombre);
			setValue('descripcion', orden.descripcion);
			setValue('pago_efectivo', orden.pago_efectivo);
			setValue('precio', orden.precio);
			setValue('fecha', orden.fecha);
			setValue('otros_gastos_descripcion', orden.otros_gastos_descripcion);
			setValue('costo_otros_gastos', orden.costo_otros_gastos);
			setValue('impuesto_representacion', orden.impuesto_representacion);
			setValue('impuesto_onat', orden.impuesto_onat);
			setValue('impuesto_equipos', orden.impuesto_equipos);
			setValue('costo_total', orden.costo_total);
			setValue('utilidad', orden.utilidad);
			setValue('facturado', orden.facturado);
			setValue('entidad', orden.entidad);
		}
	}, [setValue, orden]);

	const saveOrden: SubmitHandler<Inputs> = async data => {
		if (orden) {
			await updateOrden(orden.id, data);
		} else {
			await createOrden(data);
		}
		onCancel();
	};

	return (
		<div className='flex items-center justify-center m-1 '>
			<div>
				<div className='bg-slate-900  rounded-md px-10 flex items-center justify-center p-2 mb-1 bg-gradient-to-r from-blue-900 to-blue-400'>
					<p className='text-slate-50 font-normal '>Formulario de Ordenes</p>
				</div>
				<div className='bg-zinc-500  rounded-md px-10 shadow-lg bg-gradient-to-r from-slate-400 to-slate-100'>
					<form
						className='grid grid-cols-2 gap-2 text-black pt-4 shadow-lg'
						onSubmit={handleSubmit(saveOrden)}
					>
						<TextField
							className='m-3 shadow-lg text-sm'
							id='orden_name'
							type='text'
							label='Nombre'
							size='small'
							defaultValue={orden ? orden.nombre : ''}
							{...register('nombre')}
							helperText={errors.nombre?.message}
						/>

						<TextField
							className='m-3 shadow-lg text-sm '
							type='text'
							id='orden_descripcion'
							label='Descripción'
							multiline={true}
							defaultValue={orden ? orden.descripcion : ''}
							size='small'
							{...register('descripcion')}
							helperText={errors.descripcion?.message}
						/>

						<TextField
							className='m-3 shadow-lg text-sm'
							type='text'
							id='orden_pago_efectivo'
							label='Tipo de Pago'
							defaultValue={orden ? orden.pago_efectivo : ''}
							size='small'
							{...register('pago_efectivo')}
							helperText={errors.pago_efectivo?.message}
						/>

						<TextField
							className='m-3 shadow-lg'
							type='text'
							id='orden_precio'
							label='Precio(CUP)'
							defaultValue={orden ? orden.precio : ''}
							size='small'
							{...register('precio')}
							helperText={errors.precio?.message}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='datetime-local'
							id='orden_fecha'
							label='Fecha'
							defaultValue={
								orden
									? moment(orden.fecha).format('YYYY-MM-DDTHH:mm')
									: fechaActualFormat
							}
							size='small'
						/>

						<TextField
							className='m-3 shadow-lg'
							id='select-entidad'
							select
							label='Entidad'
							size='small'
							defaultValue={orden ? orden.entidad : ''}
							{...register('entidad')}
							helperText={errors.entidad?.message}
						>
							{entidadOptions}
						</TextField>

						<div className='flex pb-5 justify-end items-end pt-6 space-x-4'>
							<SecondaryButton name='Cancelar' onClick={onCancel} />
							<PrimaryButton name={orden ? 'Actualizar' : 'Guardar'} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default FormOrdenes;
