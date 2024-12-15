import { z } from 'zod';
export class productIsOutOfStockError extends Error {
  constructor() {
    super('Produto fora de estoque.');
  }
}
export const createSaleSchema = z.object({
  id: z.string().uuid().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
