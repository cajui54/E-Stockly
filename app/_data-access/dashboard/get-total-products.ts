import 'server-only';
import { db } from '@/app/_lib/prisma';

export const GetTotalProducts = async (): Promise<number> => {
  const totalProducts = await db.product.count();

  return totalProducts;
};
