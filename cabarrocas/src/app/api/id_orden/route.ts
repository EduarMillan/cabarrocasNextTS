import { NextResponse } from 'next/server';
import { conn } from '@/libs/mysql';

export async function GET() {
	const autoIncrementResult: any = await conn.query(
		'SHOW TABLE STATUS LIKE "ordenes"',
	);
	const proximoId: number = autoIncrementResult[0]?.Auto_increment;
	return NextResponse.json(proximoId);
}
