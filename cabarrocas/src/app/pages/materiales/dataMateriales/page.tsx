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
	const [openModal, setOpenModal] = useState(false);
	const [crearMaterial, setCrearMaterial] = useState(false);
	const [eliminarMaterial, setEliminarMaterial] = useState(false);
	const [idMaterial, setIdMaterial] = useState(0);
	const [updateMaterial, setUpdateMaterial] = useState(null);

	const deleteMaterialId = () => {
		deleteMaterialById(idMaterial);
	};

	const handleCancel = () => {
		setOpenModal(false);
		setCrearMaterial(false);
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
		// {
		// 	name: 'calidad_material',
		// 	label: 'Calidad',
		// },
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

	let modalContent;
	if (crearMaterial) {
		modalContent = (
			<FormMateriales onCancel={handleCancel} material={updateMaterial} />
		);
	} else if (eliminarMaterial) {
		modalContent = (
			<div>
				<DialogTitle>Eliminar Material</DialogTitle>
				<DialogContent>
					<DialogContentText>
						¿Está seguro de querer eliminar este material?
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
		<div className='container my-10 mx-auto bg-slate-500'>
			<ThemeProvider theme={getMuiTheme()}>
				<MUIDataTable
					title='Lista de Materiales'
					data={materiales}
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

export default Materiales;
