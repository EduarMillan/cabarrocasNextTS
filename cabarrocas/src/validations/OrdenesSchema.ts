import { z } from 'zod';

const entidad = ['OHCH', 'Particulares', 'Empresas'] as const;

export type Entidad = (typeof entidad)[number];

export const mappedEntidad: { [key in Entidad]: string } = {
	OHCH: 'OHCH',
	Particulares: 'Particulares',
	Empresas: 'Empresas',
};

export const ordenSchema = z.object({
	nombre: z
		.string()
		.min(3, {
			message: 'Nombre muy corto (+ de 3 letras)',
		})
		.max(40, {
			message: 'Nombre muy largo (- de 40 letras)',
		}),
	descripcion: z
		.string()
		.min(3, {
			message: 'Descripción muy corta (+ de 3 letras)',
		})
		.max(120, {
			message: 'Descripción muy larga (- de 120 letras)',
		}),
	precio: z
		.string()
		.refine(precio => !isNaN(parseFloat(precio)), {
			message: 'El precio debe ser un número',
		})
		.refine(longitud_ancho => parseFloat(longitud_ancho) > 0, {
			message: 'El ancho debe ser mayor que 0',
		}),
	otros_gastos_descripcion: z
		.string()
		.min(3, {
			message: 'Descripción muy corta (+ de 3 letras)',
		})
		.max(120, {
			message: 'Descripción muy larga (- de 120 letras)',
		}),
	costo_otros_gastos: z
		.string()
		.refine(costo_otros_gastos => !isNaN(parseFloat(costo_otros_gastos)), {
			message: 'El costo debe ser un número',
		}),
	impuesto_representacion: z
		.string()
		.refine(
			impuesto_representacion => !isNaN(parseFloat(impuesto_representacion)),
			{
				message: 'El impuesto debe ser un número',
			},
		),
	impuesto_onat: z
		.string()
		.refine(impuesto_onat => !isNaN(parseFloat(impuesto_onat)), {
			message: 'El impuesto debe ser un número',
		}),
	impuesto_equipos: z
		.string()
		.refine(impuesto_equipos => !isNaN(parseFloat(impuesto_equipos)), {
			message: 'El impuesto debe ser un número',
		}),
	costo_total: z
		.string()
		.refine(costo_total => !isNaN(parseFloat(costo_total)), {
			message: 'El Costo debe ser un número',
		}),
	utilidad: z.string().refine(utilidad => !isNaN(parseFloat(utilidad)), {
		message: 'La utilidad debe ser un número',
	}),
	entidad: z.enum(entidad, {
		errorMap: () => ({
			message: 'Seleccione una entidad de la lista.',
		}),
	}),
	espesor: z
		.string()
		.refine(espesor => !isNaN(parseFloat(espesor)), {
			message: 'El grosor debe ser un número',
		})
		.refine(espesor => parseFloat(espesor) > 0, {
			message: 'El grosor debe ser mayor que 0',
		}),
	fecha: z
		.string()
		.refine(fecha => new Date(fecha).toString() !== 'Invalid Date', {
			message: 'La fecha debe de ser válida',
		}),
});
