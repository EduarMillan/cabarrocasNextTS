import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

interface FormData {
    nombre: string,
    descripcion: string,
    pago_efectivo: number,
    precio: number,
    fecha: Date,
    otros_gastos_descripcion: string,
    costo_otros_gastos: number,
    impuesto_representacion: number,
    impuesto_onat: number,
    impuesto_equipos: number,
    costo_total: number,
    utilidad: number,
    facturado: number,
    entidad: string,
  }

export async function GET( request: Request, { params }: any ){
  try {
    const result:Array<Object>  = await conn.query("SELECT * FROM trabajos_realizados WHERE id = ?", [params.id]);
  
    if( result.length ===0 ){
      return NextResponse.json(
        {message: "Orden no encontrada"},
        {status: 404,}
      );
    }

    return NextResponse.json ( result[0] );
  } catch(error: any) {
    return NextResponse.json( 
      {
        message: error.message,
      },
      {
        status: 404,
      }
    );
  }

}


export async function DELETE(request: Request, { params }: any){
  try{

    const result: any = await conn.query("DELETE FROM trabajos_realizados WHERE id = ?", [params.id]);
    await conn.query('DELETE FROM materialestrabajosrealizados WHERE id_orden =?', [params.id]);

    if(result.affectedRows===0){
      return NextResponse.json (
        {
          message: "Orden no encontrada",
        },
        {
          status: 404,
        }
      );   
    }

    return NextResponse.json ("Ordem Eliminada");

  } catch(error: any){
    return NextResponse.json (
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
    
}


export async function PATCH( request: Request, {params}: any ){

  try{
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
        costo_total
      }: FormData = await request.json();

    let impRepres;
    let onat;
    const costoTotal = costo_total + costo_otros_gastos;

    if (pago_efectivo === 1) {
        impRepres = 0;
        onat = 0;
      } else {
        impRepres = precio * 0.11;
        onat = (precio - impRepres) * 0.35;
      }
    
      const impEquip = (precio - impRepres - onat - costo_total - costo_otros_gastos) * 0.1;
      const utilidad = (precio - impRepres - onat - impEquip - costoTotal);

      const result: any = await conn.query(
        'UPDATE trabajos_realizados SET nombre = ?, descripcion = ?, pago_efectivo = ?, precio = ?, fecha = ?, otros_gastos_descripcion = ?, costo_otros_gastos = ?, impuesto_representacion = ?, impuesto_onat =?, impuesto_equipos = ?, costo_total = ?, utilidad=?, facturado = ?, entidad=?  WHERE id=?',
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
          impEquip,
          costoTotal,
          utilidad,
          facturado,
          entidad,
          [params.id],
        ],
      );

    if(result.affectedRows===0){
      return NextResponse.json (
        {
          message: "Orden no encontrada",
        },
        {
          status: 404,
        }
      );   
    }
    return NextResponse.json ("Actualizando Orden");
  }  catch(error: any){
    return NextResponse.json (
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
  
}
