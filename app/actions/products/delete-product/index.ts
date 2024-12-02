'use server';
import { db } from '@/app/_lib/prisma';
import { DeleteProductSchema, deleteProductSchema } from './shema';
import { revalidatePath } from 'next/cache';

export const deleteProduct = async ({ id }: DeleteProductSchema) => {
  deleteProductSchema.parse({ id });
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidatePath('/products');
};