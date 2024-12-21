'server only';
import { db } from '@/app/_lib/prisma';
import { Product } from '@prisma/client';
import { unstable_cache } from 'next/cache';

export type ProductStatusDto = 'IN_STOCK' | 'OUT_OF_STOCK';
export interface ProductDTO extends Product {
  status: ProductStatusDto;
}
export const getProducts = async (): Promise<ProductDTO[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
  }));
};

export const cachedGetProducts = unstable_cache(getProducts, ['getProducts'], {
  tags: ['get-products'],
});
/*export const cachedGetProducts = unstable_cache(getProducts, ['get-products'], {
  revalidate: 5,
});
*/
