'use client';
import React, { useEffect, useState } from 'react';
import { MapsHomeWork } from '@mui/icons-material';
import moment from 'moment';
import GraficoObras from './GraficoObras';

interface Orden {
	id: number;
	nombre: string;
	descripcion: string;
	pago_efectivo: number;
	precio: number;
	fecha: Date;
	otros_gastos_descripcion: string;
	costo_otros_gastos: number;
	impuesto_representacion: number;
	impuesto_onat: number;
	impuesto_equipos: number;
	costo_total: number;
	utilidad: number;
	facturado: number;
	entidad: string;
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const importMaterialUI = async () => {
	const mui = await import('@mui/material');
	return mui;
};

function TabPanel(props: Readonly<TabPanelProps>) {
	const [mui, setMui] = useState<any>(null);
	const { children, value, index, ...other } = props;

	useEffect(() => {
		const loadMaterialUI = async () => {
			const materialUI = await importMaterialUI();
			setMui(materialUI);
		};

		loadMaterialUI();
	}, []);

	if (!mui) {
		return null;
	}

	const { Box } = mui;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 2 }}>
					<div className='text-lg text-blue-700 text-center font-light'>
						{children}
					</div>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

export default function VerticalTabs(props: Readonly<{ data: Orden[] }>) {
	const [value, setValue] = React.useState<number>(0);
	const [trabajosRealizados, setTrabajosRealizados] = useState<Array<Orden>>(
		[],
	);
	const [trabajosAnnoActual, setTrabajosAnnoActual] = useState<number>(0);
	const [trabajosAnnoPasado, setTrabajosAnnoPasado] = useState<number>(0);
	const [mui, setMui] = useState<any>(null);

	useEffect(() => {
		const loadMaterialUI = async () => {
			const materialUI = await importMaterialUI();
			setMui(materialUI);
		};

		loadMaterialUI();
	}, []);

	const loadTrabajosRealizados = () => {
		const datos = props.data;
		setTrabajosRealizados(datos);
	};

	const trabajosPorFecha = () => {
		try {
			const datos = props.data;
			const annoActual = moment().year();
			const annoPasado = annoActual - 1;

			const trabajosAnnoActual: number = datos.filter(
				dato => moment(dato.fecha).year() === annoActual,
			).length;
			const trabajosAnnoPasado: number = datos.filter(
				dato => moment(dato.fecha).year() === annoPasado,
			).length;

			setTrabajosAnnoActual(trabajosAnnoActual);
			setTrabajosAnnoPasado(trabajosAnnoPasado);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		loadTrabajosRealizados();
		trabajosPorFecha();
	}, []);

	const handleChange = (event: any, newValue: number) => {
		setValue(newValue);
	};

	if (!mui) {
		return null;
	}

	const { Box, Paper, Typography, Tab, Tabs } = mui;

	return (
		<Paper
			elevation={3}
			sx={{
				m: 1,
				p: 3,
				background: 'transparent',
				border: '2px solid #2C3E50',
				borderRadius: '20px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box sx={{ flexGrow: 1, display: 'flex', height: 210 }}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						sx={{ borderRight: 1, borderColor: 'divider' }}
					>
						<Tab label='Gráficos' sx={{ color: 'white' }} {...a11yProps(0)} />
						<Tab label='Año Actual' sx={{ color: 'white' }} {...a11yProps(1)} />
						<Tab label='Año Pasado' sx={{ color: 'white' }} {...a11yProps(2)} />
						<Tab label='Histórico' sx={{ color: 'white' }} {...a11yProps(3)} />
					</Tabs>
					<TabPanel value={value} index={0}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<GraficoObras data={props.data} />
						</Box>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Typography variant='h6' marginLeft={5}>
							TRABAJOS REALIZADOS
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<MapsHomeWork
								sx={{
									height: 100,
									width: 100,
									opacity: 0.3,
									ml: 5,
									mt: 5,
									color: '#FFFFFF',
								}}
							/>
							<Typography
								variant='h4'
								marginLeft={5}
								marginTop={5}
								color='grey'
							>
								{trabajosAnnoActual}
							</Typography>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Typography variant='h6' marginLeft={5}>
							TRABAJOS REALIZADOS
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<MapsHomeWork
								sx={{
									height: 100,
									width: 100,
									opacity: 0.3,
									ml: 5,
									mt: 5,
									color: '#FFFFFF',
								}}
							/>
							<Typography
								variant='h4'
								marginLeft={5}
								marginTop={5}
								color='grey'
							>
								{trabajosAnnoPasado}
							</Typography>
						</Box>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Typography variant='h6' marginLeft={5}>
							TRABAJOS REALIZADOS
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<MapsHomeWork
								sx={{
									height: 100,
									width: 100,
									opacity: 0.3,
									ml: 5,
									mt: 5,
									color: '#FFFFFF',
								}}
							/>
							<Typography
								variant='h4'
								marginLeft={5}
								marginTop={5}
								color='grey'
							>
								{trabajosRealizados.length}
							</Typography>
						</Box>
					</TabPanel>
				</Box>
			</Box>
		</Paper>
	);
}
