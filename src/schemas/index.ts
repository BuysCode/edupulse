import { z } from 'zod'

export const signinSchema = z.object({
  username_or_email: z.string().min(1, "Username ou email é obrigatório"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres")
})

export const validateProductSerial = z.object({
  serial: z.string().min(1, "O serial do produto é obrigatório").max(20, "O serial do produto deve conter no máximo 20 caracteres")
})