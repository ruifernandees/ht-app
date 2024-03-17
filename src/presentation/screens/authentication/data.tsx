import * as zod from 'zod'

type TAutoCapitalize = "none" | "sentences" | "words" | "characters" | undefined

export const inputs = [
  {
    placeholder: 'E-mail',
    name: 'email',
    autoCapitalize: 'none' as TAutoCapitalize,
  },
  {
    placeholder: 'Senha',
    name: 'password',
    secureTextEntry: true,
    autoCapitalize: 'none' as TAutoCapitalize,
  }
]

export const FormSchema = zod.object({
  email: zod.string({required_error: 'Informe o e-mail'}).email('E-mail inválido!'),
  password: zod.string({required_error: 'Informe a senha'}),
});