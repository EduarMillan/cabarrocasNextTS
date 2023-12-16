import { z } from 'zod';

const materiales = [
	'PVC',
	'Acrilico',
	'Bicapa',
	'Glaspa',
	'Playwood',
	'Aluminio_Anodizado',
	'Goma_Rubber',
	'Smart_X',
	'Espejo',
	'Vidrio',
	'Madera',
	'Zinc_Galvanizado',
	'Vinilo_Brillo',
	'Vinilo_Mate',
	'Vinilo_Corte',
	'Laminado',
	'Papel',
	'Lona_Banner',
	'Lona_Mesh',
	'Esmerilado',
	'Vinilo_Microperforado',
	'Lienzo',
	'Tela',
] as const;

export type Materiales = (typeof materiales)[number];

export const mappedMateriales: { [key in Materiales]: string } = {
	PVC: 'PVC',
	Acrilico: 'Acrilico',
	Bicapa: 'Bicapa',
	Glaspa: 'Glaspa',
	Playwood: 'Playwood',
	Aluminio_Anodizado: 'Aluminio_Anodizado',
	Goma_Rubber: 'Goma_Rubber',
	Smart_X: 'Smart_X',
	Espejo: 'Espejo',
	Vidrio: 'Vidrio',
	Madera: 'Madera',
	Zinc_Galvanizado: 'Zinc_Galvanizado',
	Vinilo_Brillo: 'Vinilo_Brillo',
	Vinilo_Mate: 'Vinilo_Mate',
	Vinilo_Corte: 'Vinilo_Corte',
	Laminado: 'Laminado',
	Papel: 'Papel',
	Lona_Banner: 'Lona_Banner',
	Lona_Mesh: 'Lona_Mesh',
	Esmerilado: 'Esmerilado',
	Vinilo_Microperforado: 'Vinilo_Microperforado',
	Lienzo: 'Lienzo',
	Tela: 'Tela',
};

const colores = [
	'Negro',
	'Transparente',
	'Rojo',
	'Verde',
	'Azul',
	'Amarillo',
	'Blanco',
	'Gris',
] as const;

export type Colores = (typeof colores)[number];

export const mappedColores: { [key in Colores]: string } = {
	Negro: 'Negro',
	Transparente: 'Transparente',
	Rojo: 'Rojo',
	Verde: 'Verde',
	Azul: 'Azul',
	Amarillo: 'Amarillo',
	Blanco: 'Blanco',
	Gris: 'Gris',
};

export const materialSchema = z.object({
	descripcion: z
		.string()
		.min(3, {
			message: 'Descripción muy corta (+ de 3 letras)',
		})
		.max(100, {
			message: 'Descripción muy larga (- de 100 letras)',
		}),
	ancho: z.string().refine(ancho => parseFloat(ancho) > 0, {
		message: 'El ancho debe de ser mayor que 0',
	}),
	material: z.enum(materiales, {
		errorMap: () => ({
			message: 'Seleccione un material de la lista.',
		}),
	}),
	calidad: z.boolean().default(true),
	largo: z.string().refine(largo => parseFloat(largo) > 0, {
		message: 'El largo debe de ser mayor que 0',
	}),
	cantidad: z.string().refine(cantidad => parseFloat(cantidad) > 0, {
		message: 'La cantidad debe de ser mayor que 0',
	}),
	costo: z.string().refine(costo => parseFloat(costo) > 0, {
		message: 'El costo debe de ser mayor que 0',
	}),
	color: z.enum(colores, {
		errorMap: () => ({
			message: 'Seleccione un color de la lista.',
		}),
	}),
	espesor: z.string().refine(espesor => parseFloat(espesor) > 0, {
		message: 'El grosor debe de ser mayor que 0',
	}),
});
