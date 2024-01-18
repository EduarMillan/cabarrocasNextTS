'use client';
import React, { useEffect, useState } from 'react';
import MUIDataTable, {
	MUIDataTableColumn,
	MUIDataTableOptions,
} from 'mui-datatables';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useMaterialesOrdenes from '@/redux/services/materialesOrdenes/materialesOrdenesService';
import { selectMaterialesOrdenes } from '@/redux/features/materialesOrdenes/materialesOrdenesSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import CustomModal from '@/components/utils/CustomModal';
import SecondaryButton from '@/components/utils/SecondaryButton';
import PrimaryButton from '@/components/utils/PrimaryButton';
import FormMaterialesOrdenes from '../formMaterialesOrdenes/page';
import AddIcon from '@mui/icons-material/Add';

/**
 * Renders the "MaterialesOrdenes" component.
 *
 * @return {JSX.Element} The rendered "MaterialesOrdenes" component.
 */
function DataTableMaterialesOrdenes(/*id_orden?: number*/) {
	const getMuiTheme = () =>
		createTheme({
			components: {
				MUIDataTableBodyCell: {
					styleOverrides: {
						root: {
							color: '#000000',
							fontSize: '12px',
							padding: '5px',
						},
					},
				},
				MUIDataTableHeadCell: {
					styleOverrides: {
						root: {
							backgroundColor: '#115e59',
							color: '#ffffff',
							fontSize: '12px',
							padding: '5px',
						},
					},
				},
				MUIDataTableToolbar: {
					styleOverrides: {
						root: {
							backgroundColor: '#022c22',
							color: '#ffffff',
							height: '40px',
							padding: '5 5 5 5',
							minHeight: '10px',
						},
						icon: {
							color: '#ffffff',
						},
					},
				},
				MUIDataTableFooter: {
					styleOverrides: {
						root: {
							backgroundColor: '#115e59',
							fontSize: '12px',
						},
					},
				},
				MUIDataTablePagination: {
					styleOverrides: {
						root: {
							color: '#ffffff',
						},
					},
				},
			},
		});

	const { getMaterialesOrdenes, deleteMaterialOrdenById } =
		useMaterialesOrdenes();
	const materialesOrdenesState = useSelector(selectMaterialesOrdenes);
	const [openModal, setOpenModal] = useState(false);
	const [crearMaterial, setCrearMaterial] = useState(false);
	const [eliminarMaterial, setEliminarMaterial] = useState(false);
	const [idMaterial, setIdMaterial] = useState(0);
	const [updateMaterial, setUpdateMaterial] = useState(null);

	const deleteMaterialId = () => {
		deleteMaterialOrdenById(idMaterial);
	};

	const handleCancel = () => {
		setOpenModal(false);
		setCrearMaterial(false);
	};

	useEffect(() => {
		getMaterialesOrdenes();
	}, []);

	const materialesOrdenes =
		materialesOrdenesState.length > 0
			? materialesOrdenesState[0].materialesOrdenes
			: [];

	const columns = [
		{
			name: 'id',
			label: 'ID',
		},
		{
			name: 'nombre',
			label: 'Nombre',
		},
		{
			name: 'descripcion',
			label: 'Descripción',
		},
		{
			name: 'espesor',
			label: 'Espesor (mm)',
		},
		{
			name: 'medida_ancho',
			label: 'Ancho (m)',
		},
		{
			name: 'medida_largo',
			label: 'Largo (m)',
		},
		{
			name: 'precio_total',
			label: 'Costo Total',
		},
		{
			name: 'precio_m2',
			label: 'Precio m2',
		},
		{
			name: 'precio_ml',
			label: 'Precio ml',
		},
		{
			name: 'color',
			label: 'Color',
		},
		{
			name: 'acciones',
			label: 'Acciones',

			options: {
				filter: false,
				customHeadRender: (columnMeta: { index: React.Key }) => (
					<th key={columnMeta.index} className='bg-teal-800 border-b'>
						{columnMeta.index === columns.length - 1 ? (
							<Tooltip title='Insertar Material' arrow>
								<IconButton
									aria-label='Insertar Material'
									style={{ color: '#ffffff' }}
									onClick={() => {
										setUpdateMaterial(null);
										setCrearMaterial(true);
										setOpenModal(true);
									}}
								>
									<AddIcon className='bg-green-500 rounded-full w-16 shadow-lg' />
								</IconButton>
							</Tooltip>
						) : null}
					</th>
				),
				customBodyRender: (value: any, tableMeta: any) => (
					<div className='flex'>
						<Tooltip title='Editar' arrow>
							<IconButton
								aria-label='Editar'
								style={{ color: '#ca8a04' }}
								onClick={() => {
									setUpdateMaterial(tableMeta.rowData);
									setCrearMaterial(true);
									setOpenModal(true);
								}}
							>
								<AssignmentIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title='Eliminar' arrow>
							<IconButton
								aria-label='Eliminar'
								style={{ color: '#f87171' }}
								onClick={() => {
									setEliminarMaterial(true);
									setOpenModal(true);
									setIdMaterial(tableMeta.rowData[0]);
								}}
							>
								<DeleteIcon> </DeleteIcon>
							</IconButton>
						</Tooltip>
					</div>
				),
			},
		},
	];

	const options: MUIDataTableOptions = {
		download: false,
		print: false,
		search: false,
		filter: false,
		viewColumns: false,
		tableId: 'materialesDataOrden',
		selectableRowsHeader: false,
		selectableRows: 'none',
		filterType: 'checkbox',
		rowsPerPage: 5,
		rowsPerPageOptions: [5, 10, 15],
		elevation: 14,
		responsive: 'standard',

		textLabels: {
			body: {
				noMatch: 'Lo sentimos, no encontramos coincidencias',
				toolTip: 'Ordenar',
				columnHeaderTooltip: (column: MUIDataTableColumn) =>
					`Ordenar por ${column.label}`,
			},
			pagination: {
				next: 'Próxima página',
				previous: 'Página anterior',
				rowsPerPage: 'Filas por páginas:',
				displayRows: 'de',
			},
		},
	};

	let modalContent;
	if (crearMaterial) {
		modalContent = (
			<FormMaterialesOrdenes
				onCancel={handleCancel}
				material={updateMaterial}
			/>
		);
	} else if (eliminarMaterial) {
		modalContent = (
			<div>
				<DialogTitle>Eliminar Material</DialogTitle>
				<DialogContent>
					<DialogContentText>
						¿Está seguro de querer eliminar este material de la orden?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<SecondaryButton
						name='Cancelar'
						onClick={() => {
							setEliminarMaterial(false);
							setOpenModal(false);
						}}
					/>
					<PrimaryButton
						name='Aceptar'
						onClick={() => {
							deleteMaterialId();
							setOpenModal(false);
						}}
					/>
				</DialogActions>
			</div>
		);
	}

	return (
		<div className='container my-2 mx-auto'>
			<ThemeProvider theme={getMuiTheme()}>
				<MUIDataTable
					title='Materiales de la orden'
					data={materialesOrdenes}
					columns={columns}
					options={options}
				/>
				<CustomModal open={openModal} width='md'>
					{modalContent}
				</CustomModal>
			</ThemeProvider>
		</div>
	);
}

export default DataTableMaterialesOrdenes;
