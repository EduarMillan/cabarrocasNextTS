import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import moment from 'moment';

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

interface DataItem {
	id: number;
	name: string;
	value: number;
	color: string;
}

const cx: number = 150; // espaciado lef
const cy: number = 97; // espaciado top
const iR: number = 50; // radio interior
const oR: number = 100; // radio exterior

export default function GraficoObras(props: Readonly<{ data: Orden[] }>) {
	const [value, setValue] = useState<number>(0); // aguja
	const [aveProfitLY, setAveProfitLY] = useState<number>(0); // verde
	const [aveProfitBLY, setAveProfitBLY] = useState<number>(0); // azul
	const [aveG, setAveG] = useState<number>(0); // rojo

	const aveAAUtilidad = () => {
		// aguja
		const currentYear = moment().year();
		const works: Array<Orden> = props.data;
		const worksAY = works.filter(
			work => moment(work.fecha).year() === currentYear,
		);
		const profitAY: number = worksAY.reduce(
			(sum, work) => sum + work.utilidad,
			0,
		);
		const avePAY = profitAY / worksAY.length;
		const aveProfitAYRound: number = parseFloat(avePAY.toFixed(2));

		setValue(aveProfitAYRound);
		// Ave. Works last Year
		const worksLY = works.filter(
			work => moment(work.fecha).year() === currentYear - 1,
		);
		const profitLY = worksLY.reduce((sum, work) => sum + work.utilidad, 0);
		const avePLY = profitLY / worksLY.length;
		const aveProfitLYRound = Number((avePLY / worksLY.length).toFixed(2));
		setAveProfitLY(aveProfitLYRound);
		// Average works before last years
		const worksBLY = works.filter(
			work => moment(work.fecha).year() === currentYear - 2,
		);
		const profitBLY = worksBLY.reduce((sum, work) => sum + work.utilidad, 0);
		const avePBLY = profitBLY / worksBLY.length;
		const aveProfitBLYRound = avePBLY / worksBLY.length;
		setAveProfitBLY(aveProfitBLYRound);
		// Average General.... rojo...
		const promG = Number(((aveProfitLY + aveProfitBLY) / 2).toFixed(2));
		setAveG(promG);
	};

	const RADIAN = Math.PI / 180;
	const data: DataItem[] = [
		{
			id: 1,
			name: 'A',
			value: aveG,
			color: '#ff0000',
		},
		{
			id: 2,
			name: 'B',
			value: aveProfitLY,
			color: '#00ff00',
		},
		{
			id: 3,
			name: 'C',
			value: aveProfitBLY,
			color: '#0000ff',
		},
	];

	const needle = (
		value: number,
		data: Array<DataItem>,
		cx: number,
		cy: number,
		iR: number,
		oR: number,
		color: string,
	) => {
		let xba = 0,
			yba = 0,
			xbb = 0,
			ybb = 0,
			xp = 0,
			yp = 0;

		let total: number = 0;
		data.forEach(v => {
			total += v.value;
		});

		if (!isFinite(value) || total === 0) {
			return 0;
		}

		const ang = 180.0 * (1 - value / total);
		const length = (iR + 2 * oR) / 3;
		const sin = Math.sin(-RADIAN * ang);
		const cos = Math.cos(-RADIAN * ang);
		const r = 5;
		const x0 = cx + 5;
		const y0 = cy + 5;
		xba = x0 + r * sin;
		yba = y0 - r * cos;
		xbb = x0 - r * sin;
		ybb = y0 + r * cos;
		xp = x0 + length * cos;
		yp = y0 + length * sin;

		if (![xba, yba, xbb, ybb, xp, yp].every(coord => isFinite(coord))) {
			return 0;
		}

		return (
			<g key={1}>
				<circle cx={x0} cy={y0} r={r} fill={color} stroke='none' />
				<path
					d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
					stroke='none'
					fill={color}
				/>
			</g>
		);
	};

	useEffect(() => {
		aveAAUtilidad();
	}, [value]);

	return (
		<div className='container1 w-300'>
			<div>
				<PieChart width={280} height={110} id='2'>
					<Pie
						dataKey='value'
						startAngle={180}
						endAngle={0}
						data={data}
						cx={cx}
						cy={cy}
						innerRadius={iR}
						outerRadius={oR}
						fill='#8884d8'
						stroke='none'
					>
						{data.map(entry => (
							<Cell key={`cell-${entry.id}`} fill={entry.color} />
						))}
					</Pie>
					{needle(value, data, cx, cy, iR, oR, '#d0d000')}
				</PieChart>
			</div>
			<div>
				<div className='flex text-red-500 text-sm justify-center'>
					<div className='ml-4'>Prom. Trabajos:</div>
					<div className='ml-2'>{aveG}</div>{' '}	
				</div>
				<div className='flex text-green-500 text-sm justify-center'>
					<div className='ml-3'>Trabajos {moment().year() - 1}:</div> <div className='ml-2'>{aveProfitLY}</div>
				</div>
				<div className='flex text-blue-500 text-sm justify-center'>
					<div className='ml-7'>Trabajos {moment().year() - 2}:</div> <div className='ml-2'>{aveProfitBLY}</div>
				</div>
				<div className='flex text-yellow-500 text-sm justify-center'>
					<div className='ml-12'>Año Actual:</div>
					<div className='ml-2'>{value}</div>{' '}
				</div>
			</div>
		</div>
	);
}
