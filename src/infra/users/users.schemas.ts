import { z } from 'zod'

export const signinSchema = z.object({
    username_or_email: z.string().min(1, "Username ou email é obrigatório"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres")
})

export const signupSchema = z.object({
    fullName: z.string("O nome deve ser um texto").min(3, "O nome deve ter"),
    userName: z.string("O nome de usuário deve ser um texto").min(3, 'Nome de usuário deve ter no mínimo 3 caracteres').max(16, "O nome de usuário deve ter no máximo 16 caracteres"),
    email: z.email("E-mail inválido").min(1, "E-mail não inserido"),
    password: z.string("A senha deve ser um texto")
})

export const validateProductSerial = z.object({
    serial: z.string().min(1, "O serial do produto é obrigatório").max(20, "O serial do produto deve conter no máximo 20 caracteres")
})

export type SignInSchemaT = z.infer<typeof signinSchema>

export type SignUpSchemaT = z.infer<typeof signupSchema>

export type ValidateProductSerialT = z.infer<typeof validateProductSerial>