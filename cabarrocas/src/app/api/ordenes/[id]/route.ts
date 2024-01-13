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

export async function GET(request: Request, { params }: any) {
	try {
		const result: Array<Object> = await conn.query(
			'SELECT * FROM ordenes WHERE id = ?',
			[params.id],
		);

		if (result.length === 0) {
			return NextResponse.json(
				{ message: 'Orden no encontrada' },
				{ status: 404 },
			);
		}

		return NextResponse.json(result[0]);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: 404,
			},
		);
	}
}

export async function DELETE(request: Request, { params }: any) {
	try {
		const result: any = await conn.query('DELETE FROM ordenes WHERE id = ?', [
			params.id,
		]);
		await conn.query(
			'DELETE FROM materialestrabajosrealizados WHERE id_orden =?',
			[params.id],
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{
					message: 'Orden no encontrada',
				},
				{
					status: 404,
				},
			);
		}

		return NextResponse.json('Ordem Eliminada');
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

export async function PATCH(request: Request, { params }: any) {
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
		}: FormData = await request.json();

		const precio_num = parseFloat(precio);
		const costo_otros_gastos_num = parseFloat(costo_otros_gastos);
		const costo_total_num = parseFloat(costo_total);

		let impRepres: number;
		let onat: number;
		let efectivo;
		let facturado_bool;

		//revisar esta logica
		const costoTotal = costo_total_num + costo_otros_gastos_num;

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

		const impEquip =
			(precio_num -
				impRepres -
				onat -
				costo_total_num -
				costo_otros_gastos_num) *
			0.1;
		const utilidad = precio_num - impRepres - onat - impEquip - costoTotal;

		const result: any = await conn.query(
			'UPDATE ordenes SET nombre = ?, descripcion = ?, pago_efectivo = ?, precio = ?, fecha = ?, otros_gastos_descripcion = ?, costo_otros_gastos = ?, impuesto_representacion = ?, impuesto_onat =?, impuesto_equipos = ?, costo_total = ?, utilidad=?, facturado = ?, entidad=?  WHERE id=?',
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
				impEquip,
				costoTotal,
				utilidad,
				facturado_bool,
				entidad,
				[params.id],
			],
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{
					message: 'Orden no encontrada',
				},
				{
					status: 404,
				},
			);
		}
		return NextResponse.json('Actualizando Orden');
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
