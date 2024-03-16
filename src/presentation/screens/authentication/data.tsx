import * as zod from 'zod'

export const inputs = [
  {
    placeholder: 'E-mail',
    name: 'email',
  },
  {
    placeholder: 'Senha',
    name: 'password',
  }
]

export const FormSchema = zod.object({
  email: zod.string({required_error: 'Informe o e-mail'}).email('E-mail inválido!'),
  password: zod.string({required_error: 'Informe a senha'}),
});