import { db } from '@/app/_lib/prisma';

export async function GET() {
  const products = await db.product.findMany({});
  const randomNumber = Math.random();
  return Response.json({ products, randomNumber }, { status: 200 });
}
