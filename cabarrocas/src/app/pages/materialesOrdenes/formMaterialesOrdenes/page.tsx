'use client';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem } from '@mui/material';
import PrimaryButton from '@/components/utils/PrimaryButton';
import SecondaryButton from '@/components/utils/SecondaryButton';
import useMaterialesOrdenes from '@/redux/services/materialesOrdenes/materialesOrdenesService';
import {
	materialSchema,
	mappedMateriales,
	mappedColores,
} from '@/validations/MaterialOrdenShema';
import { useSelector } from 'react-redux';
import useMateriales from '@/redux/services/materiales/materialesService';
import { selectMateriales } from '@/redux/features/materiales/materialesSlice';

type Inputs = {
	id_orden: string;
	nombre: string;
	descripcion: string;
	medida_ancho: string;
	medida_largo: string;
	color: string;
	precio_total: string;
	espesor: string;
	precio_largo: string;
	precio_m2: string;
};

/**
 * Renders a form for selecting materials and their properties.
 *
 * @return {JSX.Element} The rendered form component.
 */
function FormMaterialesOrdenes({ onCancel, material, idOrden }: any) {
	const { getMateriales } = useMateriales();
	const materialesState = useSelector(selectMateriales);
	const { createMaterialesOrden, updateMaterialOrden } = useMaterialesOrdenes();
	const [name, setName] = useState('');
	const [espesor, setEspesor] = useState(0);
	const [color, setColor] = useState('');
	const [ancho, setAncho] = useState(0);
	const [largo, setLargo] = useState(0);
	const [precioM2, setPrecioM2] = useState(0);
	const [precioMl, setPrecioMl] = useState(0);
	const [precioT, setPrecioT] = useState(0);

	const materiales =
		materialesState.length > 0 ? materialesState[0].materiales : [];

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

	const handlePrecioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let name: string;
		let espesor = 0;
		let color: string;
		let ancho = 0;
		let largo = 0;

		if (event.target.name === 'nombre') {
			name = event.target.value;
			setName(name);
		} else if (event.target.name === 'espesor') {
			espesor = parseInt(event.target.value);
			setEspesor(espesor);
		} else if (event.target.name === 'color') {
			color = event.target.value;
			setColor(color);
		} else if (event.target.name === 'medida_ancho') {
			ancho = parseFloat(event.target.value);
			setAncho(ancho);
		} else if (event.target.name === 'medida_largo') {
			largo = parseFloat(event.target.value);
			setLargo(largo);
		}
	};

	const costosMaterial = () => {
		let m2 = 0;
		let precio = 0;
		let ml = 0;
		let i = 0;
		for (const element of materiales) {
			if (
				element.nombre === name &&
				element.espesor === espesor &&
				element.color === color
			) {
				m2 += element.costo_m2;
				precio += element.costo_total;
				ml += element.costo_ml;
				i++;
			}
		}
		if (m2 === 0 || i === 0) setPrecioM2(0);
		else setPrecioM2(parseFloat((precio / i / m2).toFixed(2)));

		if (ml === 0 || i === 0) setPrecioMl(0);
		else setPrecioMl(parseFloat((precio / i / ml).toFixed(2)));

		const viniloOptions = [
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

		if (viniloOptions.includes(name)) {
			setPrecioT(parseFloat((precio / largo).toFixed(2)));
		} else {
			setPrecioT(parseFloat((precio / (largo * ancho)).toFixed(2)));
		}
	};

	useEffect(() => {
		costosMaterial();
	}, [ancho, largo, name, espesor, color, materiales]);

	useEffect(() => {
		getMateriales();
		if (material) {
			setValue('id_orden', material[1].toString());
			setValue('nombre', material[2]);
			setValue('descripcion', material[3]);
			setValue('espesor', material[4].toString());
			setValue('medida_ancho', material[5].toString());
			setValue('medida_largo', material[6].toString());
			setValue('precio_total', material[7].toString());
			setValue('precio_m2', material[8].toString());
			setValue('precio_largo', material[9].toString());
			setValue('color', material[10]);
		}
	}, [setValue, material]);

	const saveMaterials: SubmitHandler<Inputs> = async data => {
		if (material) {
			await updateMaterialOrden(material[0], material[1], data);
		} else {
			await createMaterialesOrden(data);
		}
		onCancel();
	};

	return (
		<div className='grid items-center justify-center m-1 grid-cols-1 '>
			<div>
				<div className='bg-emerald-950   px-10 flex items-center justify-start p-2 mb-1'>
					<p className='text-slate-50  text-xl'>
						{material ? 'Actualizar material' : 'Crear material'}
					</p>
				</div>
				<div className='bg-zinc-500  rounded-md px-5 shadow-lg bg-gradient-to-r from-slate-200 to-slate-100'>
					<form
						className='grid grid-cols-5 gap-1 text-black pt-4 '
						onSubmit={handleSubmit(saveMaterials)}
					>
						<TextField
							className='m-3 text-sm'
							type='text'
							InputProps={{
								readOnly: true,
								sx: { color: 'green', borderBottom: '1px solid green' },
							}}
							id='outlined-idOrden'
							label='Orden #'
							value={idOrden}
							size='small'
							{...register('id_orden')}
						/>

						<TextField
							className='m-3'
							id='select-material'
							select
							label='Material'
							size='small'
							defaultValue={material ? material[2] : ''}
							{...register('nombre')}
							helperText=<p className='text-red-500'>
								{errors.nombre?.message}
							</p>
							onChange={handlePrecioChange}
						>
							{materialOptions}
						</TextField>

						<TextField
							className='m-3 only:text-sm '
							type='text'
							id='outlined-descripcion'
							label='Descripción'
							multiline={true}
							defaultValue={material ? material[3] : ''}
							size='small'
							{...register('descripcion')}
							helperText=<p className='text-red-500'>
								{errors.descripcion?.message}
							</p>
						/>

						<TextField
							className='m-3 text-sm'
							type='text'
							id='outlined-espesor'
							label='Espesor(mm)'
							defaultValue={material ? material[4] : ''}
							size='small'
							{...register('espesor')}
							helperText=<p className='text-red-500'>
								{errors.espesor?.message}
							</p>
							onChange={handlePrecioChange}
						/>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-ancho'
							label='Ancho(m)'
							defaultValue={material ? material[5] : ''}
							size='small'
							{...register('medida_ancho')}
							helperText=<p className='text-red-500'>
								{errors.medida_ancho?.message}
							</p>
							onChange={handlePrecioChange}
						/>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-largo'
							label='Largo(m)'
							defaultValue={material ? material[6] : ''}
							size='small'
							{...register('medida_largo')}
							helperText=<p className='text-red-500'>
								{errors.medida_largo?.message}
							</p>
							onChange={handlePrecioChange}
						/>

						<TextField
							className='m-3 '
							id='select-color2'
							select
							label='Color'
							size='small'
							defaultValue={material ? material[10] : ''}
							{...register('color')}
							helperText=<p className='text-red-500'>{errors.color?.message}</p>
							onChange={handlePrecioChange}
						>
							{colorOptions}
						</TextField>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-costo'
							label='Costo(CUP)'
							defaultValue={material ? material[7] : ''}
							size='small'
							{...register('precio_total')}
							helperText=<>
								<p className='text-red-500'>{errors.precio_total?.message}</p>
								<p>Sugerencia de precio: {precioT} CUP </p>
							</>
						/>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-costo'
							label='Costo M2(CUP)'
							defaultValue={material ? material[8] : ''}
							size='small'
							{...register('precio_m2')}
							helperText=<>
								<p className='text-red-500'>{errors.precio_m2?.message}</p>
								<p>Sugerencia de precio: {precioM2} CUP</p>
							</>
						/>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-costo'
							label='Costo ML(CUP)'
							defaultValue={material ? material[9] : ''}
							size='small'
							{...register('precio_largo')}
							helperText=<>
								<p className='text-red-500'>{errors.precio_largo?.message}</p>
								<p>Sugerencia de precio: {precioMl} CUP</p>
							</>
						/>
						<div></div>
						<div></div>
						<div></div>
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

export default FormMaterialesOrdenes;
