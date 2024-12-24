import { ProductStatusDto } from '../product/get-products';
import { db } from '@/app/_lib/prisma';
export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}
const getMostSoldProducts = async (): Promise<MostSoldProductDto[]> => {
  const mostSoldProductsQuery = `
     SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id" as "productId"
     FROM "SaleProduct"
     JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
     GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
     ORDER BY "totalSold" DESC
     LIMIT 5;
   `;

  const mostSoldProducts = await db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      totalSold: number;
      stock: number;
      price: number;
    }[]
  >(mostSoldProductsQuery);

  const itemsMostSold: MostSoldProductDto[] = mostSoldProducts.map(
    (product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
    }),
  );
  return itemsMostSold;
};

export default getMostSoldProducts;