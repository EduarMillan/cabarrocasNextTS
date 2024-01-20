'use client';
import React, { useEffect } from 'react';
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
function FormMaterialesOrdenes({ onCancel, material }: any) {
	const { createMaterialesOrden, updateMaterialOrden } = useMaterialesOrdenes();

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
			setValue('id_orden', material[1].toString());
			setValue('nombre', material[2]);
			setValue('descripcion', material[3]);
			setValue('espesor', material[4].toString());
			setValue('medida_ancho', material[5].toString());
			setValue('medida_largo', material[6].toString());
			setValue('precio_total', material[7].toString());
			setValue('precio_m2', material[8].toString());
			setValue('precio_largo', material[9].toString());
			setValue('color', material[8]);
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
		<div className='flex items-center justify-center m-1'>
			<div>
				<div className='bg-slate-900  rounded-md px-10 flex items-center justify-center p-2 mb-1 bg-gradient-to-r from-blue-900 to-blue-400'>
					<p className='text-slate-50 font-normal '>
						Formulario de materiales de la orden
					</p>
				</div>
				<div className='bg-zinc-500  rounded-md px-10 shadow-lg bg-gradient-to-r from-slate-200 to-slate-100'>
					<form
						className='grid grid-cols-3 gap-2 text-black pt-4 '
						onSubmit={handleSubmit(saveMaterials)}
						//onSubmit={handleSubmit(data => console.log(data))}
					>
						<TextField
							className='m-3'
							id='select-material'
							select
							label='Material'
							size='small'
							defaultValue={material ? material[2] : ''}
							{...register('nombre')}
							helperText={errors.nombre?.message}
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
							helperText={errors.descripcion?.message}
						/>

						<TextField
							className='m-3 text-sm'
							type='text'
							id='outlined-espesor'
							label='Espesor(mm)'
							defaultValue={material ? material[4] : ''}
							size='small'
							{...register('espesor')}
							helperText={errors.espesor?.message}
						/>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-ancho'
							label='Ancho(m)'
							defaultValue={material ? material[5] : ''}
							size='small'
							{...register('medida_ancho')}
							helperText={errors.medida_ancho?.message}
						/>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-largo'
							label='Largo(m)'
							defaultValue={material ? material[6] : ''}
							size='small'
							{...register('medida_largo')}
							helperText={errors.medida_largo?.message}
						/>

						<TextField
							className='m-3 '
							id='select-color'
							select
							label='Color'
							size='small'
							defaultValue={material ? material[10] : ''}
							{...register('color')}
							helperText={errors.color?.message}
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
							helperText={errors.precio_total?.message}
						/>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-costo'
							label='Costo M2(CUP)'
							defaultValue={material ? material[8] : ''}
							size='small'
							{...register('precio_m2')}
							helperText={errors.precio_m2?.message}
						/>

						<TextField
							className='m-3 '
							type='text'
							id='outlined-costo'
							label='Costo ML(CUP)'
							defaultValue={material ? material[9] : ''}
							size='small'
							{...register('precio_largo')}
							helperText={errors.precio_largo?.message}
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

export default FormMaterialesOrdenes;
