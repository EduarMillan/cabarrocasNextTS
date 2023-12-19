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
import useMateriales from '@/redux/services/materiales/materialesService';
import { selectMateriales } from '@/redux/features/materiales/materialesSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import CustomModal from '@/components/utils/CustomModal';
import SecondaryButton from '@/components/utils/SecondaryButton';
import PrimaryButton from '@/components/utils/PrimaryButton';
import FormMateriales from '../formMateriales/page';
import AddIcon from '@mui/icons-material/Add';

/**
 * Renders the "Materiales" component.
 *
 * @return {JSX.Element} The rendered "Materiales" component.
 */
function Materiales() {
	const getMuiTheme = () =>
		createTheme({
			components: {
				MUIDataTableBodyCell: {
					styleOverrides: {
						root: {
							backgroundColor: '#09131A',
							color: '#ffffff',
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
							backgroundColor: '#09131A',
							color: '#ffffff',
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

	const { getMateriales, deleteMaterialById } = useMateriales();
	const materialesState = useSelector(selectMateriales);
	const [openModal, setopenModal] = useState(false);
	const [crearMaterial, setcrearMaterial] = useState(false);
	const [eliminarMaterial, seteliminarMaterial] = useState(false);
	const [idMaterial, setidMaterial] = useState(0);

	const deleteMaterialId = () => {
		deleteMaterialById(idMaterial);
	};

	const handleCancel = () => {
		setopenModal(false);
		setcrearMaterial(false);
	};

	useEffect(() => {
		getMateriales();
	}, []);

	const materiales =
		materialesState.length > 0 ? materialesState[0].materiales : [];

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
			name: 'longitud_ancho',
			label: 'Ancho (m)',
		},
		{
			name: 'longitud_largo',
			label: 'Largo (m)',
		},
		{
			name: 'calidad_material',
			label: 'Calidad',
		},
		{
			name: 'costo_total',
			label: 'Costo Total',
		},
		{
			name: 'cantidad',
			label: 'Cant.',
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
				customHeadRender: (columnMeta: any) => (
					<th key={columnMeta.index} className='bg-teal-800 border-b'>
						{columnMeta.index === columns.length - 1 ? (
							<Tooltip title='Insertar Material' arrow>
								<IconButton
									aria-label='Insertar Material'
									style={{ color: '#ffffff' }}
									onClick={() => {
										setcrearMaterial(true);
										setopenModal(true);
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
									//navigate(`/dashboard/materiales/${tableMeta.rowData[0]}`);
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
									seteliminarMaterial(true);
									setopenModal(true);
									setidMaterial(tableMeta.rowData[0]);
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
		tableId: 'materialesData',
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
			toolbar: {
				search: 'Buscar',
				downloadCsv: 'Descargar CSV',
				print: 'Imprimir',
				viewColumns: 'Ver Columnas',
				filterTable: 'Filtros de Tabla',
			},
			filter: {
				all: 'All',
				title: 'Filtros',
				reset: 'Reiniciar',
			},
			viewColumns: {
				title: 'Mostrar Columnas',
				titleAria: 'Mostrar/Ocultar Columnas de Tabla ',
			},
			selectedRows: {
				text: 'fila(s) seleccionadas',
				delete: 'Eliminar',
				deleteAria: 'Delete Selected Rows',
			},
		},
	};

	return (
		<div className='container my-10 mx-auto bg-slate-500'>
			<ThemeProvider theme={getMuiTheme()}>
				<MUIDataTable
					title='Lista de Materiales'
					data={materiales}
					columns={columns}
					options={options}
				/>
				<CustomModal open={openModal} width='md'>
					{crearMaterial ? (
						<FormMateriales onCancel={handleCancel} />
					) : eliminarMaterial ? (
						<div>
							<DialogTitle>Eliminar Material</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Está seguro de querer eliminar este material?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<SecondaryButton
									name='Cancelar'
									onClick={() => {
										seteliminarMaterial(false);
										setopenModal(false);
									}}
								/>
								<PrimaryButton
									name='Aceptar'
									onClick={() => {
										deleteMaterialId();
										setopenModal(false);
									}}
								/>
							</DialogActions>
						</div>
					) : null}
				</CustomModal>
			</ThemeProvider>
		</div>
	);
}

export default Materiales;
