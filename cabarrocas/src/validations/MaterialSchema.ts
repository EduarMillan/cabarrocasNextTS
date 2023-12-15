import { z } from 'zod';

const materiales = [
	'vacio',
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
	vacio: 'vacio',
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

export const materialSchema = z.object({
	descripcion: z
		.string()
		.min(3, {
			message: 'La descripción debe tener al menos 3 caracteres',
		})
		.max(100, {
			message: 'La descripción no puede superar los 100 caracteres',
		}),
	ancho: z.string().refine(ancho => parseFloat(ancho) > 0, {
		message: 'El ancho debe de ser diferente de 0',
	}),
	material: z.enum(materiales, {
		errorMap: () => ({
			message: 'Seleccione un material de la lista.',
		}),
	}),
	calidad: z.boolean().default(true),
});
/*

ancho
calidad
cantidad
color
costo
descripcion
espesor
largo
material

*/
