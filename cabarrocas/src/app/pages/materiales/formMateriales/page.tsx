'use client';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem } from '@mui/material';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
	calidad_material: string;
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
function FormMateriales({ onCancel }: any) {
	const { createMateriales } = useMateriales();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
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

	const selectedMaterial = watch('nombre');
	useEffect(() => {
		setValue('nombre', selectedMaterial);
	}, [setValue]);

	const selectedColor = watch('color');
	useEffect(() => {
		setValue('color', selectedColor);
	}, [setValue]);

	const saveMaterials: SubmitHandler<Inputs> = async data => {
		await createMateriales(data);
	};

	return (
		<div className='flex items-center justify-center m-1 '>
			<div>
				<div className='bg-slate-900  rounded-md px-10 flex items-center justify-center p-2 mb-1 bg-gradient-to-r from-blue-900 to-blue-400'>
					<p className='text-slate-50 font-normal '>Formulario de Materiales</p>
				</div>
				<div className='bg-zinc-500  rounded-md px-10 shadow-lg bg-gradient-to-r from-slate-400 to-slate-100'>
					<form
						className='grid grid-cols-3 gap-2 text-black pt-4 shadow-lg'
						onSubmit={handleSubmit(saveMaterials)}
					>
						<TextField
							className='m-3 shadow-lg'
							id='select-material'
							select
							label='Material'
							size='small'
							defaultValue=''
							{...register('nombre')}
							helperText={errors.nombre?.message}
						>
							{materialOptions}
						</TextField>
						<TextField
							className='m-3 shadow-lg text-sm '
							type='text'
							id='outlined-descripcion'
							label='Descripción'
							multiline={true}
							size='small'
							{...register('descripcion')}
							helperText={errors.descripcion?.message}
						/>

						<TextField
							className='m-3 shadow-lg text-sm'
							type='number'
							id='outlined-espesor'
							label='Espesor(mm)'
							size='small'
							{...register('espesor')}
							helperText={errors.espesor?.message}
						/>

						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-ancho'
							label='Ancho(m)'
							size='small'
							{...register('longitud_ancho')}
							helperText={errors.longitud_ancho?.message}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-largo'
							label='Largo(m)'
							size='small'
							{...register('longitud_largo')}
							helperText={errors.longitud_largo?.message}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-costo'
							label='Costo(CUP)'
							size='small'
							{...register('costo_total')}
							helperText={errors.costo_total?.message}
						/>

						<TextField
							className='m-3 shadow-lg'
							id='select-color'
							select
							label='Color'
							size='small'
							defaultValue=''
							{...register('color')}
							helperText={errors.color?.message}
						>
							{colorOptions}
						</TextField>

						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-cantidad'
							label='Cantidad'
							size='small'
							{...register('cantidad')}
							helperText={errors.cantidad?.message}
						/>

						<Stack
							className='justify-start ml-4 '
							direction='row'
							spacing={0.5}
							alignItems='center'
						>
							<Typography className='m-2 text-zinc-700'>Calidad:</Typography>
							<Typography className='italic pl-2'>Baja</Typography>
							<Switch
								id='calidad'
								defaultChecked
								{...register('calidad_material')}
							/>
							<Typography className='italic'>Alta</Typography>
						</Stack>
						<div></div>
						<div className='flex pb-5 justify-end items-end pt-6 space-x-4'>
							<SecondaryButton name='Cancelar' onClick={onCancel} />
							<PrimaryButton name='Guardar' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default FormMateriales;
