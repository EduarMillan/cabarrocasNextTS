'use client';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem } from '@mui/material';
import PrimaryButton from '@/components/utils/PrimaryButton';
import SecondaryButton from '@/components/utils/SecondaryButton';
import useOrdenes from '@/redux/services/ordenes/ordenesServices';
import { ordenSchema, mappedEntidad } from '@/validations/OrdenesSchema';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import DataTableMaterialesOrdenes from '@/app/pages/materialesOrdenes/dataMaterialesOrdenes/page';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';

type Orden = {
	id: number;
	nombre: string;
	descripcion: string;
	pago_efectivo: boolean;
	precio: string;
	fecha: string;
	otros_gastos_descripcion: string;
	costo_otros_gastos: string;
	impuesto_representacion: string;
	impuesto_onat: string;
	impuesto_equipos: string;
	costo_total: string;
	utilidad: string;
	facturado: boolean;
	entidad: string;
};

interface Estado {
	pago_efectivo: boolean;
	facturado: boolean;
}

/**
 * Renders a form for selecting ordenes and their properties.
 *
 * @param onCancel - Function to handle cancel action.
 * @param orden - The orden object.
 * @param id - The orden ID.
 * @returns The rendered form component.
 */
function FormOrdenes({
	onCancel,
	orden,
	id,
}: Readonly<{
	onCancel: () => void;
	orden: Orden | null;
	id: number;
}>): JSX.Element {
	const { createOrden, updateOrden } = useOrdenes();

	const [prec, setPrec] = useState(0);
	const [represent, setRepresent] = useState(0);
	const [onat, setOnat] = useState(0);
	const [equipos, setEquipos] = useState(0);
	const [matServ, setMatServ] = useState(0);
	const [utilidad, setUtilidad] = useState(0);

	const handlePrecioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const precio = parseFloat(event.target.value);
		setPrec(precio);
		console.log(prec);
		const impRep = precio * 0.11;

		const impOnat = (precio - impRep) * 0.35;

		const impEquip = (precio - impRep - impOnat - matServ) * 0.1;

		const util = precio - impRep - impOnat - impEquip - matServ;

		setRepresent(parseFloat(impRep.toFixed(2)));
		setOnat(parseFloat(impOnat.toFixed(2)));
		setEquipos(parseFloat(impEquip.toFixed(2)));
		setUtilidad(parseFloat(util.toFixed(2)));
	};

	const handleOtrosGastosChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const otrosGastos = parseFloat(event.target.value);
		setMatServ(otrosGastos);
		console.log(otrosGastos);
		console.log(prec);
		const impRep = prec * 0.11;

		const impOnat = (prec - impRep) * 0.35;

		const impEquip = (prec - impRep - impOnat - matServ - otrosGastos) * 0.1;

		const util = prec - impRep - impOnat - impEquip - matServ - otrosGastos;

		setEquipos(parseFloat(impEquip.toFixed(2)));
		setUtilidad(parseFloat(util.toFixed(2)));
	};

	const fechaActual = new Date();
	const fechaActualFormat = fechaActual.toISOString().slice(0, 16);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Orden>({
		resolver: zodResolver(ordenSchema),
	});

	const entidadOptions = Object.entries(mappedEntidad).map(([key, value]) => (
		<MenuItem key={key} value={value}>
			{value}
		</MenuItem>
	));

	const [state, setState] = React.useState<Estado>({
		pago_efectivo: orden ? Boolean(orden.pago_efectivo) : false,
		facturado: orden ? Boolean(orden.facturado) : false,
	});

	const handleChange = (name: keyof Estado) => {
		setState(prevState => ({
			...prevState,
			[name]: !prevState[name],
		}));
	};

	useEffect(() => {
		if (orden) {
			setValue('nombre', orden.nombre);
			setValue('descripcion', orden.descripcion);
			setValue('pago_efectivo', Boolean(orden.pago_efectivo));
			setValue('precio', orden.precio.toString());
			setValue('fecha', orden.fecha.slice(0, 16));
			setValue('otros_gastos_descripcion', orden.otros_gastos_descripcion);
			setValue('costo_otros_gastos', orden.costo_otros_gastos.toString());
			setValue(
				'impuesto_representacion',
				orden.impuesto_representacion.toString(),
			);
			setValue('impuesto_onat', orden.impuesto_onat.toString());
			setValue('impuesto_equipos', orden.impuesto_equipos.toString());
			setValue('costo_total', orden.costo_total.toString());
			setValue('utilidad', orden.utilidad.toString());
			setValue('facturado', Boolean(orden.facturado));
			setValue('entidad', orden.entidad);

			setPrec(parseFloat(orden.precio));
			setRepresent(parseFloat(orden.impuesto_representacion));
			setOnat(parseFloat(orden.impuesto_onat));
			setEquipos(parseFloat(orden.impuesto_equipos));
			setUtilidad(parseFloat(orden.utilidad));
			setMatServ(parseFloat(orden.costo_total));
		}
	}, [setValue, orden]);

	const saveOrden: SubmitHandler<Orden> = async (data: Orden) => {
		if (orden) {
			await updateOrden(orden.id, data);
		} else {
			await createOrden(data);
		}
		onCancel();
	};

	return (
		<div className='grid items-center justify-center m-1 grid-cols-1 w-full'>
			<div>
				<div className='bg-emerald-950   px-10 flex items-center justify-start p-2 mb-1'>
					<p className='text-slate-50  text-xl'>
						{orden
							? `Actualizar orden de producción # ${orden.id}`
							: `Crear orden de producción # ${id}`}
					</p>
				</div>

				<div className='bg-zinc-500  rounded-md px-5 shadow-lg bg-gradient-to-r from-slate-200 to-slate-100'>
					<form
						className='grid grid-cols-6 gap-1  pt-4 '
						onSubmit={handleSubmit(saveOrden)}
					>
						<TextField
							className='m-3  text-sm'
							id='orden_name'
							type='text'
							label='Nombre'
							size='small'
							defaultValue={orden ? orden.nombre : ''}
							{...register('nombre')}
							helperText={errors.nombre?.message}
						/>

						<TextField
							className='m-3  text-sm '
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
							className='m-3 text-sm'
							type='text'
							id='orden_precio'
							label='Precio(CUP)'
							defaultValue={orden ? orden.precio : ''}
							size='small'
							{...register('precio')}
							helperText={errors.precio?.message}
							onChange={handlePrecioChange}
						/>

						<TextField
							className='m-3 text-sm'
							type='datetime-local'
							id='orden_fecha'
							label='Fecha'
							defaultValue={
								orden ? orden.fecha.slice(0, 16) : fechaActualFormat
							}
							size='small'
							{...register('fecha')}
							helperText={errors.fecha?.message}
						/>

						<TextField
							className='m-3 text-sm'
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

						<TextField
							className='m-3 text-sm '
							type='text'
							id='orden_gastos_descripcion'
							label='Descrip. otros gastos'
							multiline={true}
							defaultValue={orden ? orden.otros_gastos_descripcion : ''}
							size='small'
							{...register('otros_gastos_descripcion')}
							helperText={errors.otros_gastos_descripcion?.message}
						/>

						<TextField
							className='m-3 text-sm'
							type='text'
							id='otros_gastos'
							label='Otros Gastos(CUP)'
							defaultValue={orden ? orden.costo_otros_gastos : ''}
							size='small'
							{...register('costo_otros_gastos')}
							helperText={errors.costo_otros_gastos?.message}
							onChange={handleOtrosGastosChange}
						/>

						<TextField
							className='m-3 text-sm'
							type='text'
							InputProps={{
								readOnly: true,
								sx: { color: 'red', borderBottom: '1px solid red' },
							}}
							id='imp_rep'
							label='Imp. Repres.(CUP)'
							value={represent}
							size='small'
							variant='filled'
							{...register('impuesto_representacion')}
						/>

						<TextField
							className='m-3 text-sm'
							type='text'
							InputProps={{
								readOnly: true,
								sx: { color: 'red', borderBottom: '1px solid red' },
							}}
							id='onat'
							label='Imp. ONAT(CUP)'
							value={onat}
							size='small'
							variant='filled'
							{...register('impuesto_onat')}
						/>

						<TextField
							className='m-3 text-sm'
							type='text'
							InputProps={{
								readOnly: true,
								sx: { color: 'red', borderBottom: '1px solid red' },
							}}
							id='imp_equipos'
							label='Imp. Equipos(CUP)'
							value={equipos}
							size='small'
							variant='filled'
							{...register('impuesto_equipos')}
						/>

						<TextField
							type='text'
							InputProps={{
								readOnly: true,
								sx: { color: 'red', borderBottom: '1px solid red' },
							}}
							className='m-3 text-sm'
							id='orden_costo'
							label='Costo Mat + Servicios(CUP)'
							value={matServ}
							size='small'
							variant='filled'
							{...register('costo_total')}
						/>

						<TextField
							className='m-3 text-sm '
							type='text'
							InputProps={{
								readOnly: true,
								sx: { color: 'green', borderBottom: '1px solid green' },
							}}
							id='orden_utilidad'
							label='Utilidad (CUP)'
							value={utilidad}
							size='small'
							variant='filled'
							{...register('utilidad')}
						/>

						<div className='ml-3'>
							<FormControl
								id='efectivo_switch'
								component='fieldset'
								variant='standard'
							>
								<FormLabel component='legend'>Tipo de Pago </FormLabel>

								<FormControlLabel
									control={
										<Switch
											checked={state.pago_efectivo}
											onClick={() => handleChange('pago_efectivo')}
											{...register('pago_efectivo')}
										/>
									}
									label='Efectivo'
								/>
							</FormControl>
						</div>

						<div className='ml-3'>
							<FormControl
								id='facturado_switch'
								component='fieldset'
								variant='standard'
							>
								<FormLabel component='legend'>Facturación </FormLabel>

								<FormControlLabel
									control={
										<Switch
											checked={state.facturado}
											onClick={() => handleChange('facturado')}
											{...register('facturado')}
										/>
									}
									label='Facturado'
								/>
							</FormControl>
						</div>
						<div></div>
						<div></div>
						<div></div>
						<div className='flex pb-5 justify-end items-end pt-6 space-x-4'>
							<SecondaryButton name='Cancelar' onClick={onCancel} />
							<PrimaryButton name={orden ? 'Actualizar' : 'Guardar'} />
						</div>
					</form>
				</div>
			</div>
			<div>
				{orden ? (
					<DataTableMaterialesOrdenes id_orden={orden.id} />
				) : (
					<>
						<div className='flex align-middle justify-center'>
							<WarningTwoToneIcon fontSize='large' color='warning' />
						</div>
						<div className='flex align-middle justify-center'>
							<p className='text-red-500 font-semibold'>
								No hay materiales asignados a esta orden actualmente
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default FormOrdenes;
