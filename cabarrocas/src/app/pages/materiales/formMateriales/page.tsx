'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PrimaryButton from '@/components/utils/PrimaryButton';
import SecondaryButton from '@/components/utils/SecondaryButton';
import { materialSchema, mappedMateriales } from '@/validations/MaterialSchema';

type ColorOption = {
	english: string;
	spanish: string;
};

type Inputs = {
	ancho: string;
	calidad: string;
	cantidad: string;
	color: string;
	costo: string;
	descripcion: string;
	espesor: string;
	largo: string;
	material: string;
};

const colorOptions: Array<ColorOption> = [
	{ english: '', spanish: '' },
	{ english: 'Black', spanish: 'Negro' },
	{ english: 'Transparent', spanish: 'Transparente' },
	{ english: 'Red', spanish: 'Rojo' },
	{ english: 'Green', spanish: 'Verde' },
	{ english: 'Blue', spanish: 'Azul' },
	{ english: 'Yellow', spanish: 'Amarillo' },
];

/**
 * Renders a form for selecting materials and their properties.
 *
 * @return {JSX.Element} The rendered form component.
 */
function FormMateriales() {
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
		([key, value]) =>
			key !== 'vacio' && (
				<MenuItem key={key} value={value}>
					{value}
				</MenuItem>
			),
	);

	useEffect(() => {
		setValue('material', selectedMaterial);
	}, [setValue]);

	const selectedMaterial = watch('material');

	useEffect(() => {
		setValue('color', colorOptions[0].spanish);
	}, [setValue]);

	const selectedColor = watch('color');

	return (
		<div className='flex items-center justify-center h-screen'>
			<div>
				<div className='bg-slate-900  rounded-md px-10 flex items-center justify-center p-2 mb-1 bg-gradient-to-r from-blue-900 to-blue-400'>
					<p className='text-slate-50 font-normal '>Formulario de Materiales</p>
				</div>
				<div className='bg-zinc-500  rounded-md px-10 shadow-lg bg-gradient-to-r from-slate-400 to-slate-100'>
					<form
						className='grid grid-cols-2 gap-2 text-black pt-4 shadow-lg'
						onSubmit={handleSubmit(data => console.log(data))}
					>
						<FormControl>
							<InputLabel id='select-material' className='ml-3 mt-1'>
								Material
							</InputLabel>
							<Select
								className='m-3 shadow-lg text-sm'
								labelId='select-material'
								label='Material'
								value={selectedMaterial || ''}
								size='small'
								{...register('material')}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								{materialOptions}
							</Select>
							{errors.material?.message && (
								<p className='text-sm text-red-500 ml-3'>
									{errors.material?.message}
								</p>
							)}
						</FormControl>
						<TextField
							className='m-3 shadow-lg text-sm '
							type='text'
							id='outlined-descripcion'
							label='Descripción'
							multiline={true}
							size='small'
							{...register('descripcion')}
						/>
						<TextField
							className='m-3 shadow-lg text-sm'
							type='number'
							id='outlined-espesor'
							label='Espesor(mm)'
							size='small'
							{...register('espesor')}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-ancho'
							label='Ancho(m)'
							size='small'
							{...register('ancho')}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-largo'
							label='Largo(m)'
							size='small'
							{...register('largo')}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-costo'
							label='Costo(CUP)'
							size='small'
							{...register('costo')}
						/>
						<FormControl>
							<InputLabel id='select-color' className='ml-3 mt-1'>
								Color
							</InputLabel>
							<Select
								className='m-3 w-56 shadow-lg'
								labelId='select-color'
								label='Color'
								value={selectedColor || ''}
								size='small'
								{...register('color')}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								{colorOptions.map(
									color =>
										color.spanish !== '' && (
											<MenuItem
												key={color.english}
												value={color.spanish}
												style={{
													backgroundColor: color.english,
													color: color.english === 'Black' ? 'white' : 'black',
												}}
											>
												{color.spanish}
											</MenuItem>
										),
								)}
							</Select>
						</FormControl>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-cantidad'
							label='Cantidad'
							size='small'
							{...register('cantidad')}
						/>
						<Typography className='m-2 text-zinc-700'>
							Seleccione calidad del material:
						</Typography>
						<Stack
							className='justify-start ml-4 '
							direction='row'
							spacing={0.5}
							alignItems='center'
						>
							<Typography>Baja</Typography>
							<Switch defaultChecked {...register('calidad')} />
							<Typography>Alta</Typography>
						</Stack>
						<div className='flex pb-5 justify-end pt-6 space-x-4'>
							<SecondaryButton name='Cancelar' />
							<PrimaryButton name='Guardar' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default FormMateriales;
