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

const EMAIL_REQUIRED_MESSAGE = 'Informe o e-mail'
const PASSWORD_REQUIRED_MESSAGE = 'Informe a senha'

export const FormSchema = zod.object({
  email: zod
    .string({ required_error: EMAIL_REQUIRED_MESSAGE })
    .min(1, EMAIL_REQUIRED_MESSAGE)
    .email('E-mail inválido!'),
  password: zod
    .string({ required_error: PASSWORD_REQUIRED_MESSAGE })
    .min(1, PASSWORD_REQUIRED_MESSAGE)
});