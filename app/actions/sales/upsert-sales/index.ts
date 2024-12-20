'use server';
import { db } from '@/app/_lib/prisma';
import { createSaleSchema, productIsOutOfStockError } from './schema';
import { revalidatePath } from 'next/cache';
import { actionClient } from '@/app/_lib/safe-action';
import { returnValidationErrors } from 'next-safe-action';

export const upsetSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    await db.$transaction(async (trx) => {
      const isUpdate = Boolean(id);
      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { saleProducts: true },
        });
        await trx.sale.delete({
          where: { id },
        });

        if (!existingSale) return;

        for (const product of existingSale?.saleProducts) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      }
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
        const productFromDb = await trx.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: ['Product not found.'],
          });
        }
        const productIsOutOfStock = product.quantity > productFromDb.stock;

        if (productIsOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: ['Product out of stock.'],
          });
        }

        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });
        await trx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });

    revalidatePath('/', 'layout');
  });
