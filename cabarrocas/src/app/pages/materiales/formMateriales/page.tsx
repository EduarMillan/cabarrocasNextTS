'use client';
import React, { useState } from 'react';
import {useForm} from "react-hook-form";
import { TextField, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PrimaryButton from '@/components/utils/PrimaryButton';
import SecondaryButton from '@/components/utils/SecondaryButton';

type ColorOption = {
	english: string;
	spanish: string;
};

function FormMateriales() {

  const {register, handleSubmit} = useForm();
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedMaterial, setSelectedMaterial] = useState('');

	const handleColorChange = (event: SelectChangeEvent) => {
		setSelectedColor(event.target.value);
	};

	const handleMaterialChange = (event: SelectChangeEvent) => {
		setSelectedMaterial(event.target.value);
	};

	const colorOptions: Array<ColorOption> = [
		{ english: 'Black', spanish: 'Negro' },
		{ english: 'Transparent', spanish: 'Transparente' },
		{ english: 'Red', spanish: 'Rojo' },
		{ english: 'Green', spanish: 'Verde' },
		{ english: 'Blue', spanish: 'Azul' },
		{ english: 'Yellow', spanish: 'Amarillo' },
	];

	const materialOptions: Array<string> = [
		'PVC',
		'Acrilico',
		'Bicapa',
		'Glaspa',
		'Playwood',
		'Aluminio_Anodizado',
		'Goma_Rubber',
		'Smart_X',
		'Espejo',
		'Vidrio',
		'Madera',
		'Zinc_Galvanizado',
		'Vinilo_Brillo',
		'Vinilo_Mate',
		'Vinilo_Corte',
		'Laminado',
		'Papel',
		'Lona_Banner',
		'Lona_Mesh',
		'Esmerilado',
		'Vinilo_Microperforado',
		'Lienzo',
		'Tela',
	];

	return (
		<div className='flex items-center justify-center h-screen'>
			<div>
				<div className='bg-slate-900  rounded-md px-10 flex items-center justify-center p-2 mb-1 bg-gradient-to-r from-blue-900 to-blue-400'>
					<p className='text-slate-50 font-normal '>Formulario de Materiales</p>
				</div>
				<div className='bg-zinc-500  rounded-md px-10 shadow-lg bg-gradient-to-r from-slate-400 to-slate-100'>
					<form className='grid grid-cols-2 gap-2 text-black pt-4 shadow-lg' onSubmit={handleSubmit(data=>{console.log(data)})}>
						<FormControl>
							<InputLabel id='select-material' className='ml-3 mt-1'>
								Material
							</InputLabel>
							<Select
								className='m-3 shadow-lg text-sm'
								labelId='select-material'
								label='Material'
								value={selectedMaterial}
								//onChange={handleMaterialChange}
								size='small'
                {... register('material')}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								{materialOptions.map(mater => (
									<MenuItem key={mater} value={mater}>
										{mater}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							className='m-3 shadow-lg text-sm '
							type='text'
							id='outlined-descripcion'
							label='Descripción'
							multiline={true}
							size='small'
              {... register('descripcion')}
						/>
						<TextField
							className='m-3 shadow-lg text-sm'
							type='number'
							id='outlined-espesor'
							label='Espesor(mm)'
							size='small'
              {... register('espesor')}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-ancho'
							label='Ancho(m)'
							size='small'
              {... register('ancho')}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-largo'
							label='Largo(m)'
							size='small'
              {... register('largo')}
						/>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-costo'
							label='Costo(CUP)'
							size='small'
              {... register('costo')}
						/>
						<FormControl>
							<InputLabel id='select-color' className='ml-3 mt-1'>
								Color
							</InputLabel>
							<Select
								className='m-3 w-56 shadow-lg'
								labelId='select-color'
								label='Color'
								value={selectedColor}
								//onChange={handleColorChange}
								size='small'
                {... register('color')}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								{colorOptions.map(color => (
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
								))}
							</Select>
						</FormControl>
						<TextField
							className='m-3 shadow-lg'
							type='number'
							id='outlined-cantidad'
							label='Cantidad'
							size='small'
              {... register('cantidad')}
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
							<Switch defaultChecked   {... register('calidad')}/>
							<Typography>Alta</Typography>
						</Stack>
					</form>
					<div className='flex pb-5 justify-end pt-6 space-x-4'>
						<SecondaryButton name='Cancelar' />
						<PrimaryButton name='Guardar' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormMateriales;
