/* eslint-disable @typescript-eslint/naming-convention */
import {EObjectId} from '@/domain/enums/EObjectId';
import {hexRegex, validateHexColor} from '@/global/helpers/validateHexColor';
import {type KeyboardTypeOptions} from 'react-native';
import * as zod from 'zod';

type TAutoCapitalize = 'none' | 'sentences' | 'words' | 'characters' | undefined;

export const inputs = [
	{
		placeholder: 'Rotação X do objeto',
		name: 'rotationX',
		autoCapitalize: 'none' as TAutoCapitalize,
		keyboardType: 'numeric' as KeyboardTypeOptions,
	},
	{
		placeholder: 'Rotação Y do objeto',
		name: 'rotationY',
		autoCapitalize: 'none' as TAutoCapitalize,
		keyboardType: 'numeric' as KeyboardTypeOptions,
	},
	{
		placeholder: 'Rotação Z do objeto',
		name: 'rotationZ',
		autoCapitalize: 'none' as TAutoCapitalize,
		keyboardType: 'numeric' as KeyboardTypeOptions,
	},
];

const COLOR_REQUIRED_MESSAGE = 'Informe a cor em Hexadecimal';
const SHAPE_REQUIRED_MESSAGE = 'Informe a forma do objeto';
const ROTATION_X_REQUIRED_MESSAGE = 'Informe a rotação X do objeto';
const ROTATION_Y_REQUIRED_MESSAGE = 'Informe a rotação Y do objeto';
const ROTATION_Z_REQUIRED_MESSAGE = 'Informe a rotação Z do objeto';

export const FormSchema = zod.object({
	color: zod
		.string({required_error: COLOR_REQUIRED_MESSAGE})
		.min(1, COLOR_REQUIRED_MESSAGE)
		.refine(validateHexColor, 'A cor deve ser um hexadecimal válido'),
	shape: zod
		.string({required_error: SHAPE_REQUIRED_MESSAGE})
		.min(1, SHAPE_REQUIRED_MESSAGE),
	rotationX: zod
		.coerce
		.string({required_error: ROTATION_X_REQUIRED_MESSAGE})
		.min(1, ROTATION_X_REQUIRED_MESSAGE)
		.refine(value => !isNaN(Number(value)), 'Informe um número válido')
		.transform(value => Number(value)),
	// .refine(val => {
	// 	console.log(`[${val}]`, val, String(val).length, 'X');
	// 	return String(val).length !== 0;
	// }, 'asda' + ROTATION_X_REQUIRED_MESSAGE),
	rotationY: zod
		.coerce
		.string({required_error: ROTATION_Y_REQUIRED_MESSAGE})
		.min(1, ROTATION_Y_REQUIRED_MESSAGE)

		.refine(value => !isNaN(Number(value)), 'Informe um número válido')
		.transform(value => Number(value)),
	// .refine(val => {
	// 	console.log(String(val), val, String(val).length, 'Y');
	// 	return String(val).length !== 0;
	// }, 'asda' + ROTATION_Y_REQUIRED_MESSAGE),
	rotationZ: zod
		.coerce
		.string({required_error: ROTATION_Z_REQUIRED_MESSAGE})
		.min(1, ROTATION_Z_REQUIRED_MESSAGE)
		.refine(value => !isNaN(Number(value)), 'Informe um número válido')
		.transform(value => Number(value)),
	// .refine(val => {
	// 	console.log(String(val), val, String(val).length, 'Z');
	// 	return String(val).length !== 0;
	// }, 'asda' + ROTATION_Z_REQUIRED_MESSAGE),
});

export const options = [
	{label: 'Cone', value: 'cone'},
	{label: 'Tetraedro', value: 'tetrahedron'},
	{label: 'Dodecaedro', value: 'dodecahedron'},
	{label: 'Cubo', value: 'box'},
	{label: 'Nó', value: 'torusKnot'},
];

export const ObjectLabelsMapper: Record<string, string> = {
	[EObjectId.OBJECT_A]: 'Objeto A',
	[EObjectId.OBJECT_B]: 'Objeto B',
	[EObjectId.OBJECT_C]: 'Objeto C',
};
