import { NextResponse } from 'next/server';
import { conn } from '@/libs/mysql';

interface FormData {
	nombre: string;
	descripcion: string;
	pago_efectivo: string;
	precio: string;
	fecha: string;
	otros_gastos_descripcion: string;
	costo_otros_gastos: string;
	impuesto_representacion: string;
	impuesto_onat: string;
	impuesto_equipos: string;
	costo_total: string;
	utilidad: string;
	facturado: string;
	entidad: string;
}

export async function GET() {
	const result = await conn.query('SELECT * FROM ordenes');
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
			costo_total,
		}: FormData = await req.json();

		const precio_num = parseFloat(precio);
		const costo_otros_gastos_num = parseFloat(costo_otros_gastos);
		const costo_total_num = parseFloat(costo_total);

		let impRepres: number;
		let onat: number;
		let efectivo;
		let facturado_bool;

		if (facturado) {
			facturado_bool = 1;
		} else {
			facturado_bool = 0;
		}

		if (pago_efectivo) {
			impRepres = 0;
			onat = 0;
			efectivo = 1;
		} else {
			impRepres = precio_num * 0.11;
			onat = (precio_num - impRepres) * 0.35;
			efectivo = 0;
		}

		const impEquipos: number =
			(precio_num -
				impRepres -
				onat -
				costo_otros_gastos_num -
				costo_total_num) *
			0.1;
		const utilidad: number =
			precio_num -
			impRepres -
			onat -
			impEquipos -
			costo_otros_gastos_num -
			costo_total_num;

		await conn.query(
			'INSERT INTO ordenes ( nombre, descripcion, pago_efectivo, precio, fecha, otros_gastos_descripcion, costo_otros_gastos, impuesto_representacion, impuesto_onat, impuesto_equipos, costo_total, utilidad, facturado, entidad) VALUES ( ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)',
			[
				nombre,
				descripcion,
				efectivo,
				precio_num,
				fecha,
				otros_gastos_descripcion,
				costo_otros_gastos_num,
				impRepres,
				onat,
				impEquipos,
				costo_total_num,
				utilidad,
				facturado_bool,
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
