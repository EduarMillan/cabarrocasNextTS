import { NextResponse } from 'next/server';
import { conn } from '@/libs/mysql';

interface FormData {
	id_orden: number;
	nombre: string;
	espesor: number;
	color: string;
	descripcion: string;
	medida_largo: number;
	medida_ancho: number;
	precio_largo: number;
	precio_m2: number;
	precio_total: number;
}

export async function GET() {
	const result: Array<Object> = await conn.query(
		'SELECT * FROM materialestrabajosrealizados',
	);
	return NextResponse.json(result);
}

export async function POST(req: any) {
	try {
		const {
			id_orden,
			nombre,
			espesor,
			color,
			descripcion,
			medida_largo,
			medida_ancho,
			precio_largo,
			precio_m2,
			precio_total,
		}: FormData = await req.json();

		await conn.query(
			'INSERT INTO materialestrabajosrealizados (id_orden, nombre, espesor, color, descripcion, medida_largo, medida_ancho, precio_largo, precio_m2, precio_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
			[
				id_orden,
				nombre,
				espesor,
				color,
				descripcion,
				medida_largo,
				medida_ancho,
				precio_largo,
				precio_m2,
				precio_total,
			],
		);
		return NextResponse.json('Material insertado correctamente');
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
