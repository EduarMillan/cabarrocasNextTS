'use client';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem } from '@mui/material';
import PrimaryButton from '@/components/utils/PrimaryButton';
import SecondaryButton from '@/components/utils/SecondaryButton';
import useMateriales from '@/redux/services/materiales/materialesService';
import {
	materialSchema,
	mappedMateriales,
	mappedColores,
} from '@/validations/MaterialSchema';

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

/**
 * Renders a form for selecting materials and their properties.
 *
 * @return {JSX.Element} The rendered form component.
 */
function FormMateriales({ onCancel, material }: any) {
	const { createMateriales, updateMaterial } = useMateriales();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(materialSchema),
	});

	const materialOptions = Object.entries(mappedMateriales).map(
		([key, value]) => (
			<MenuItem key={key} value={value}>
				{value}
			</MenuItem>
		),
	);

	const colorOptions = Object.entries(mappedColores).map(([key, value]) => (
		<MenuItem key={key} value={value}>
			{value}
		</MenuItem>
	));

	useEffect(() => {
		if (material) {
			setValue('nombre', material[1]);
			setValue('descripcion', material[2]);
			setValue('espesor', material[3].toString());
			setValue('longitud_ancho', material[4].toString());
			setValue('longitud_largo', material[5].toString());
			setValue('costo_total', material[6].toString());
			setValue('cantidad', material[7].toString());
			setValue('color', material[8]);
		}
	}, [setValue, material]);

	const saveMaterials: SubmitHandler<Inputs> = async data => {
		if (material) {
			await updateMaterial(material[0], data);
		} else {
			await createMateriales(data);
		}
		onCancel();
	};

	return (
		<div className='flex items-center justify-center m-1'>
			<div>
				<div className='bg-slate-900  rounded-md px-10 flex items-center justify-center p-2 mb-1 bg-gradient-to-r from-blue-900 to-blue-400'>
					<div className='text-slate-50 font-normal '>
						Formulario de Materiales
					</div>
				</div>
				<div className='bg-zinc-500  rounded-md px-10 shadow-lg bg-gradient-to-r from-slate-200 to-slate-100'>
					<form
						className='grid grid-cols-2 gap-2 text-black pt-4 '
						onSubmit={handleSubmit(saveMaterials)}
					>
						<TextField
							className='m-3'
							id='select-material'
							select
							label='Material'
							size='small'
							defaultValue={material ? material[1] : ''}
							{...register('nombre')}
							helperText={
								<div className='text-red-500'>{errors.nombre?.message}</div>
							}
						>
							{materialOptions}
						</TextField>

						<TextField
							className='m-3 text-sm '
							type='text'
							id='outlined-descripcion'
							label='Descripción'
							multiline={true}
							defaultValue={material ? material[2] : ''}
							size='small'
							{...register('descripcion')}
							helperText={
								<div className='text-red-500'>
									{errors.descripcion?.message}
								</div>
							}
						/>

						<TextField
							className='m-3 text-sm'
							type='text'
							id='outlined-espesor'
							label='Espesor(mm)'
							defaultValue={material ? material[3] : ''}
							size='small'
							{...register('espesor')}
							helperText={
								<div className='text-red-500'>{errors.espesor?.message}</div>
							}
						/>

						<TextField
							className='m-3'
							id='select-color'
							select
							label='Color'
							size='small'
							defaultValue={material ? material[8] : ''}
							{...register('color')}
							helperText={
								<div className='text-red-500'>{errors.color?.message}</div>
							}
						>
							{colorOptions}
						</TextField>

						<TextField
							className='m-3'
							type='text'
							id='outlined-ancho'
							label='Ancho(m)'
							defaultValue={material ? material[4] : ''}
							size='small'
							{...register('longitud_ancho')}
							helperText={
								<div className='text-red-500'>
									{errors.longitud_ancho?.message}
								</div>
							}
						/>

						<TextField
							className='m-3'
							type='text'
							id='outlined-largo'
							label='Largo(m)'
							defaultValue={material ? material[5] : ''}
							size='small'
							{...register('longitud_largo')}
							helperText={
								<div className='text-red-500'>
									{errors.longitud_largo?.message}
								</div>
							}
						/>

						<TextField
							className='m-3'
							type='text'
							id='outlined-costo'
							label='Costo(CUP)'
							defaultValue={material ? material[6] : ''}
							size='small'
							{...register('costo_total')}
							helperText={
								<div className='text-red-500'>
									{errors.costo_total?.message}
								</div>
							}
						/>

						<TextField
							className='m-3'
							type='number'
							id='outlined-cantidad'
							label='Cantidad'
							defaultValue={material ? material[7] : ''}
							size='small'
							{...register('cantidad')}
							helperText={
								<div className='text-red-500'>{errors.cantidad?.message}</div>
							}
						/>
						<div></div>
						<div className='flex pb-5 justify-end items-end pt-6 space-x-4'>
							<SecondaryButton name='Cancelar' onClick={onCancel} />
							<PrimaryButton name={material ? 'Actualizar' : 'Guardar'} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default FormMateriales;
