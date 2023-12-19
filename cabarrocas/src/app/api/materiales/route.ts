import { NextResponse } from 'next/server';
import { conn } from '@/libs/mysql';

interface FormData {
	nombre: string;
	descripcion: string;
	espesor: string;
	longitud_ancho: number;
	longitud_largo: number;
	costo_total: number;
	color: string;
	cantidad: number;
}

export async function GET() {
	const result = await conn.query('SELECT * FROM materiales');
	return NextResponse.json(result);
}

export async function POST(req: any) {
	try {
		const {
			nombre,
			descripcion,
			espesor,
			longitud_ancho,
			longitud_largo,
			costo_total,
			color,
			cantidad,
		}: FormData = await req.json();

		const costoM2: number = costo_total / (longitud_ancho * longitud_largo);
		const costoMl: number = costo_total / longitud_largo;

		const queries = [];

		for (let i: number = 0; i < cantidad; i += 1) {
			queries.push(
				conn.query(
					"INSERT INTO materiales (nombre, descripcion, espesor, longitud_ancho, longitud_largo, costo_total, costo_m2, costo_ml, cantidad, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?,'1',?)",
					[
						nombre,
						descripcion,
						espesor,
						longitud_ancho,
						longitud_largo,
						costo_total,
						costoM2,
						costoMl,
						color,
					],
				),
			);
		}

		await Promise.all(queries);
		return NextResponse.json('Material creado correctamente');
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
