import z from "zod"


export const userCreateSchema = z.object({
    name: z.string().min(1, 'Please type your name'),
    email: z.string().min(1, "Please type your email"),
    cpf: z.string().min(1, "Please type your cpf"),
    profession: z.string().min(1, "Please type your cpf")
});