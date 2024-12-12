'use server';
import { db } from '@/app/_lib/prisma';
import { DeleteProductSchema, deleteProductSchema } from './shema';
import { revalidatePath } from 'next/cache';
import { actionClient } from '@/app/_lib/safe-action';
import { returnValidationErrors } from 'next-safe-action';

export const deleteProductAction = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({ where: { id } });
    revalidatePath('/products');
  });

export const deleteProduct = async ({ id }: DeleteProductSchema) => {
  deleteProductSchema.parse({ id });
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidatePath('/products');
};
