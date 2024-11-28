import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'O nome do produto é obrigatório.' }),
  price: z.coerce
    .number()
    .min(0.01, { message: 'O preço do produto é obrigatório.' }),
  stock: z.coerce
    .number()
    .positive({ message: 'Quandidade deve ser maior ou igual a zero' })
    .int()
    .min(0, { message: 'A quantidade em estoque é obrigatório.' }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
