'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import MUIDataTable, {
	MUIDataTableColumn,
	MUIDataTableOptions,
} from 'mui-datatables';
import WarningIcon from '@mui/icons-material/Warning';
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
import useOrdenes from '@/redux/services/ordenes/ordenesServices';
import { selectOrdenes } from '@/redux/features/ordenes/ordenesSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import CustomModal from '@/components/utils/CustomModal';
import SecondaryButton from '@/components/utils/SecondaryButton';
import PrimaryButton from '@/components/utils/PrimaryButton';
import FormOrdenes from '../formOrdenes/page';
import AddIcon from '@mui/icons-material/Add';

type Orden = {
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
};

/**
 * Renders the "Ordenes" component.
 *
 * @return {JSX.Element} The rendered "Ordenes" component.
 */
function Ordenes() {
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

	const { getOrdenes, deleteOrdenById } = useOrdenes();
	const ordenesState = useSelector(selectOrdenes);
	const [openModal, setOpenModal] = useState(false);
	const [crearOrden, setCrearOrden] = useState(false);
	const [eliminarOrden, setEliminarOrden] = useState(false);
	const [idOrden, setIdOrden] = useState(0);
	const [updateOrden, setUpdateOrden] = useState(null);
	const [lastId, setLastId] = useState<number>(0);

	const deleteOrdenId = () => {
		deleteOrdenById(idOrden);
	};

	const handleCancel = () => {
		setOpenModal(false);
		setCrearOrden(false);
	};

	const loadingData = async () => {
		const id_Response = await getOrdenes();
		const proxID = id_Response.data;
		setLastId(proxID);
	};

	useEffect(() => {
		loadingData();
	}, [openModal]);

	const ordenes = ordenesState.length > 0 ? ordenesState[0].ordenes : [];

	const transformOrden = ordenes.map((orden: Orden) => ({
		...orden,
		pago_efectivo: orden.pago_efectivo === 1 ? 'Efectivo' : 'Contrato',
		fecha: moment(orden.fecha).format('YYYY/MM/DD'),
	}));

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
			name: 'pago_efectivo',
			label: 'Tipo de Pago',
		},
		{
			name: 'fecha',
			label: 'Fecha',
		},
		{
			name: 'entidad',
			label: 'Entidad',
		},
		{
			name: 'impuesto_representacion',
			label: 'Imp. Rep.',
		},
		{
			name: 'impuesto_onat',
			label: 'ONAT',
		},
		{
			name: 'impuesto_equipos',
			label: 'Imp. Equipos',
		},
		{
			name: 'utilidad',
			label: 'Utilidad',
		},
		{
			name: 'costo_total',
			label: 'Costo Total',
		},
		{
			name: 'precio',
			label: 'Precio',
		},

		{
			name: 'acciones',
			label: 'Acciones',

			options: {
				filter: false,
				customHeadRender: (columnMeta: { index: React.Key }) => (
					<th key={columnMeta.index} className='bg-teal-800 border-b'>
						{columnMeta.index === columns.length - 1 ? (
							<Tooltip title='Insertar Orden' arrow>
								<IconButton
									aria-label='Insertar Orden'
									style={{ color: '#ffffff' }}
									onClick={() => {
										setUpdateOrden(null);
										setCrearOrden(true);
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
									const found = ordenes.find(
										(orden: any) => orden.id === tableMeta.rowData[0],
									);
									setUpdateOrden(found);
									setCrearOrden(true);
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
									setEliminarOrden(true);
									setOpenModal(true);
									setIdOrden(tableMeta.rowData[0]);
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
		tableId: 'ordenesData',
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
	if (crearOrden) {
		modalContent = (
			<FormOrdenes onCancel={handleCancel} orden={updateOrden} id={lastId} />
		);
	} else if (eliminarOrden) {
		modalContent = (
			<div>
				<DialogTitle className='bg-green-500 text-white h-10 pt-2 pl-4'>
					<WarningIcon
						style={{
							color: 'yellow',
							paddingBottom: '5px',
							paddingRight: '5px',
						}}
					/>
					Eliminar orden
				</DialogTitle>
				<DialogContent>
					<DialogContentText className='pt-10 font-semibold'>
						¿Está seguro de querer eliminar esta orden?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<SecondaryButton
						name='Cancelar'
						onClick={() => {
							setEliminarOrden(false);
							setOpenModal(false);
						}}
					/>
					<PrimaryButton
						name='Aceptar'
						onClick={() => {
							deleteOrdenId();
							setOpenModal(false);
						}}
					/>
				</DialogActions>
			</div>
		);
	}

	return (
		<div className='container my-5 mx-auto bg-slate-500'>
			<ThemeProvider theme={getMuiTheme()}>
				<MUIDataTable
					title='Ordenes de Producción Terminadas'
					data={transformOrden}
					columns={columns}
					options={options}
				/>
				<CustomModal open={openModal} width='xl'>
					{modalContent}
				</CustomModal>
			</ThemeProvider>
		</div>
	);
}

export default Ordenes;
