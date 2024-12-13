import 'server-only';
import { db } from '@/app/_lib/prisma';
import { date } from 'zod';

export interface SaleDTO {
  id: string;
  productName: string;
  totalProduct: number;
  totalAmount: number;
  date: Date;
}
export const getSales = async (): Promise<SaleDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { product: true },
      },
    },
  });
  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productName: sale.saleProducts
      .map((saleProduct) => saleProduct.product.name)
      .join(', '),
    totalAmount: sale.saleProducts.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    totalProduct: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
  }));
};
