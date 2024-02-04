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
	'Madera',
	'Morado',
	'Marron',
	'Dorado',
	'Plata',
	'Bronce',
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
	Madera: 'Madera',
	Morado: 'Morado',
	Marron: 'Marron',
	Dorado: 'Dorado',
	Plata: 'Plata',
	Bronce: 'Bronce',
};

const validateMedidas = () => {
	let medidaAnchoValue: number | null = null;

	return {
		setMedidaAncho: (value: string) => {
			medidaAnchoValue = parseFloat(value);
		},
		validateMedidaLargo: (value: string) => {
			const medidaLargoValue = parseFloat(value);
			if (isNaN(medidaLargoValue) || medidaLargoValue <= 0) {
				return 'El largo debe ser un número mayor que 0';
			}
			if (medidaAnchoValue === null) {
				return 'Primero debe validar el ancho';
			}
			if (medidaLargoValue >= medidaAnchoValue) {
				return 'El largo debe ser mayor que el ancho';
			}
			return null;
		},
	};
};

const validator = validateMedidas();

export const materialSchema = z.object({
	descripcion: z
		.string()
		.min(3, {
			message: 'Descripción muy corta (+ de 3 letras)',
		})
		.max(100, {
			message: 'Descripción muy larga (- de 100 letras)',
		}),
	longitud_ancho: z
		.string()
		.refine(
			longitud_ancho => {
				validator.setMedidaAncho(longitud_ancho);
				return !isNaN(parseFloat(longitud_ancho));
			},
			{
				message: 'El ancho debe ser un número',
			},
		)
		.refine(longitud_ancho => parseFloat(longitud_ancho) > 0, {
			message: 'El ancho debe ser mayor que 0',
		}),
	nombre: z.enum(materiales, {
		errorMap: () => ({
			message: 'Seleccione un material de la lista.',
		}),
	}),
	longitud_largo: z
		.string()
		.refine(longitud_largo => !isNaN(parseFloat(longitud_largo)), {
			message: 'El largo debe ser un número',
		})
		.refine(longitud_largo => parseFloat(longitud_largo) > 0, {
			message: 'El largo debe ser mayor que 0',
		})
		.refine(
			validator.validateMedidaLargo,
			'El largo debe ser mayor que el ancho',
		),
	cantidad: z.string().refine(cantidad => parseFloat(cantidad) > 0, {
		message: 'La cantidad debe de ser mayor que 0',
	}),
	costo_total: z
		.string()
		.refine(costo_total => !isNaN(parseFloat(costo_total)), {
			message: 'El Costo debe ser un número',
		})
		.refine(costo_total => parseFloat(costo_total) > 0, {
			message: 'El Costo debe ser mayor que 0',
		}),
	color: z.enum(colores, {
		errorMap: () => ({
			message: 'Seleccione un color de la lista.',
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
});
