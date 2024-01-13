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
		.refine(precio => parseFloat(precio) > 0, {
			message: 'El precio debe ser mayor que 0',
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
	impuesto_representacion: z.string(),
	impuesto_onat: z.string(),
	impuesto_equipos: z.string(),
	costo_total: z.string(),
	utilidad: z.string(),
	entidad: z.enum(entidad, {
		errorMap: () => ({
			message: 'Seleccione una entidad de la lista.',
		}),
	}),
	fecha: z.string().refine(
		fecha => {
			const parsedDate = new Date(fecha);
			return !isNaN(parsedDate.getTime());
		},
		{
			message: 'La fecha debe ser válida',
		},
	),
	pago_efectivo: z.boolean(),
	facturado: z.boolean(),
});
