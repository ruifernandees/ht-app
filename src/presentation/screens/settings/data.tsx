import { EObjectId } from '@/domain/enums/EObjectId';
import * as zod from 'zod'

type TAutoCapitalize = "none" | "sentences" | "words" | "characters" | undefined

export const inputs = [
  {
    placeholder: 'Cor do objeto 1',
    name: 'color1',
    autoCapitalize: 'none' as TAutoCapitalize,
  },
  {
    placeholder: 'Cor do objeto 2',
    name: 'color2',
    autoCapitalize: 'none' as TAutoCapitalize,
  },
  {
    placeholder: 'Cor do objeto 3',
    name: 'color3',
    autoCapitalize: 'none' as TAutoCapitalize,
  },
  {
    placeholder: 'Rotação do objeto 1',
    name: 'rotation1',
    autoCapitalize: 'none' as TAutoCapitalize,
  },
  {
    placeholder: 'Rotação do objeto 2',
    name: 'rotation2',
    autoCapitalize: 'none' as TAutoCapitalize,
  },
  {
    placeholder: 'Rotação do objeto 3',
    name: 'rotation3',
    autoCapitalize: 'none' as TAutoCapitalize,
  },
]

const COLOR_REQUIRED_MESSAGE = 'Informe a cor em Hexadecimal'

export const FormSchema = zod.object({
  color1: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE),
  color2: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE),
  color3: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE),
  shape1: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE),
  shape2: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE),
  shape3: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE),
  rotation1: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE),
  rotation2: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE),
  rotation3: zod
    .string({ required_error: COLOR_REQUIRED_MESSAGE })
    .min(1, COLOR_REQUIRED_MESSAGE)

});

export const options = [
  { label: 'Cone', value: 'cone' },
  { label: 'Tetraedro', value: 'tetrahedron' },
  { label: 'Dodecaedro', value: 'dodecahedron' },
  { label: 'Cubo', value: 'cube' },
  { label: 'Nó', value: 'torusKnot' }
]

export const ObjectLabelsMapper: {[key: string]: string} = {
  [EObjectId.OBJECT_A]: 'Objeto A',
  [EObjectId.OBJECT_B]: 'Objeto A',
  [EObjectId.OBJECT_C]: 'Objeto A',
}