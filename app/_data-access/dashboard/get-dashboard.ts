'only server';
import { db } from '@/app/_lib/prisma';
import { ProductStatusDto } from '../product/get-products';

export const getDashboard = async (): Promise<DashboardDto> => {
  const mostSoldProductsQuery = `
    SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id" as "productId"
    FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
    ORDER BY "totalSold" DESC
    LIMIT 5;
  `;

  const mostSoldProductsPromise = db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      totalSold: number;
      stock: number;
      price: number;
    }[]
  >(mostSoldProductsQuery);

  const [mostSoldProducts] = await Promise.all([mostSoldProductsPromise]);

  return {
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      totalSold: Number(product.totalSold),
      price: Number(product.price),
      status: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
    })),
  };
};
/*const todayRevenuePromise = db.saleProduct.aggregate({
    _sum: {
      unitPrice: true,
    },
    where: {
      createdAt: {
        // > date today
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        //menor than 23:59:59:999
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });*/
