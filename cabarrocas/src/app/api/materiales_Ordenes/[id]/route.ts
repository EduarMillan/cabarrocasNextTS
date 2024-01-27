import { NextResponse } from 'next/server';
import { conn } from '@/libs/mysql';

export async function GET(request: any, { params }: any) {
	try {
		const result: Array<Object> = await conn.query(
			'SELECT * FROM materialestrabajosrealizados WHERE id_orden = ?',
			[params.id],
		);

		return NextResponse.json(result);
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

export async function DELETE(request: any, { params }: any) {
	try {
		const result: any = await conn.query(
			'DELETE FROM materialestrabajosrealizados WHERE id = ?',
			[params.id],
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{
					message: 'Material no encontrado',
				},
				{
					status: 404,
				},
			);
		}

		return NextResponse.json('Material Eliminado');
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

export async function PATCH(request: any, { params }: any) {
	try {
		const data = await request.json();
		const result: any = await conn.query(
			'UPDATE materialestrabajosrealizados SET ? WHERE id = ?',
			[data, params.id],
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{
					message: 'Material no encontrado',
				},
				{
					status: 404,
				},
			);
		}
		return NextResponse.json('Actualizando material');
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
