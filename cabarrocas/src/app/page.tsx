'use client';
import React, { useEffect, useState } from 'react';
import useOrdenes from '@/redux/services/ordenes/ordenesServices';
import { useSelector } from 'react-redux';
import { selectOrdenes } from '@/redux/features/ordenes/ordenesSlice';
import GraficoCircularMedio from '@/components/graficos/GraficoCircularMedio';
import TotalObras from '@/components/graficos/TotalObras';
import CircularIndeterminate from '@/app/loading';

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

function Page() {
	const { getOrdenes } = useOrdenes();
	const ordenes = useSelector(selectOrdenes);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			await getOrdenes();
			setLoading(false);
		};

		fetchData();
	}, [getOrdenes]);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div>
					<CircularIndeterminate />
				</div>
			</div>
		);
	}

	const contenedor = ordenes.length > 0 ? ordenes[0].ordenes : [];

	return (
		<div className='flex gap-1 mt-2'>
			<GraficoCircularMedio data={contenedor} />
			<TotalObras data={contenedor} />
		</div>
	);
}

export default Page;
