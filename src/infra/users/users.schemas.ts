import { z } from 'zod'

export const signinSchema = z.object({
    email: z.email("E-mail inserido inválido").min(1, "E-mail obrigatório"),
    password: z.string("A senha deve ser um texto").min(1, "Senha obrigatória")
})

export const signupSchema = z.object({
    fullName: z.string("O nome deve ser um texto").min(3, "O nome deve ter"),
    userName: z.string("O nome de usuário deve ser um texto").min(3, 'Nome de usuário deve ter no mínimo 3 caracteres').max(16, "O nome de usuário deve ter no máximo 16 caracteres"),
    email: z.email("E-mail inválido").min(1, "E-mail não inserido"),
    password: z.string("A senha deve ser um texto"),
    serialCode: z.string("O código de serial deve ser um texto").optional(),
    userRole: z.enum(["student", "parent", "employee", "admin"], "O cargo do usuário deve ser um student, parent ou employee"),
    studentId: z.array(z.string("O id dos estudantes devem ser textos")).optional(),
    parentId: z.string("O id do responsável deve ser um texto").optional()
})

export const validateProductSerial = z.object({
    serial: z.string().min(1, "O serial do produto é obrigatório").max(20, "O serial do produto deve conter no máximo 20 caracteres")
})

export type SignInSchemaT = z.infer<typeof signinSchema>

export type SignUpSchemaT = z.infer<typeof signupSchema>

export type ValidateProductSerialT = z.infer<typeof validateProductSerial>