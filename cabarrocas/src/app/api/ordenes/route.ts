import { NextResponse } from 'next/server';
import { conn } from '@/libs/mysql';

interface FormData {
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

export async function GET() {
	const result: Array<Object> = await conn.query('SELECT * FROM ordenes');
	return NextResponse.json(result);
}

export async function POST(req: Request) {
	try {
		const {
			nombre,
			descripcion,
			pago_efectivo,
			precio,
			fecha,
			otros_gastos_descripcion,
			costo_otros_gastos,
			facturado,
			entidad,
		}: FormData = await req.json();

		const costoMateriales = 0;
		let impRepres: number;
		let onat: number;

		if (pago_efectivo === 1) {
			impRepres = 0;
			onat = 0;
		} else {
			impRepres = precio * 0.11;
			onat = (precio - impRepres) * 0.35;
		}

		const impEquipos: number =
			(precio - impRepres - onat - costo_otros_gastos - costoMateriales) * 0.1;
		const utilidad: number =
			precio -
			impRepres -
			onat -
			impEquipos -
			costo_otros_gastos -
			costoMateriales;

		await conn.query(
			'INSERT INTO ordenes ( nombre, descripcion, pago_efectivo, precio, fecha, otros_gastos_descripcion, costo_otros_gastos, impuesto_representacion, impuesto_onat, impuesto_equipos, costo_total, utilidad, facturado, entidad) VALUES ( ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)',
			[
				nombre,
				descripcion,
				pago_efectivo,
				precio,
				fecha,
				otros_gastos_descripcion,
				costo_otros_gastos,
				impRepres,
				onat,
				impEquipos,
				costoMateriales,
				utilidad,
				facturado,
				entidad,
			],
		);
		return NextResponse.json('Orden insertada correctamente');
	} catch (error: any) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: 500,
			},
		);
	}
}
