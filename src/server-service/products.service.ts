import { prisma } from "@/config/prisma.config";
import { ApiError } from "@/api/error-handler.api";
import type { Product, CreateProductRequest, UpdateProductRequest } from "@/types/product.types";

export async function getProducts(userId: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { userId },
    orderBy: { order: "asc" },
  });
  return products.map(toProduct);
}

export async function createProduct(userId: string, data: CreateProductRequest): Promise<Product> {
  const maxOrder = await prisma.product.aggregate({
    where: { userId },
    _max: { order: true },
  });
  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const product = await prisma.product.create({
    data: {
      name: data.name,
      amount: data.amount,
      comment: data.comment || "",
      order: nextOrder,
      userId,
    },
  });
  return toProduct(product);
}

export async function updateProduct(userId: string, productId: string, data: UpdateProductRequest): Promise<Product> {
  await assertOwnership(userId, productId);
  const product = await prisma.product.update({
    where: { id: productId },
    data,
  });
  return toProduct(product);
}

export async function deleteProduct(userId: string, productId: string): Promise<void> {
  await assertOwnership(userId, productId);
  await prisma.product.delete({ where: { id: productId } });
}

export async function reorderProducts(userId: string, orderedIds: string[]): Promise<Product[]> {
  const products = await prisma.product.findMany({ where: { userId } });
  const productIds = new Set(products.map((p) => p.id));

  for (const id of orderedIds) {
    if (!productIds.has(id)) {
      throw new ApiError(400, "Invalid product id in reorder list");
    }
  }

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.product.update({ where: { id }, data: { order: index } })
    )
  );

  return getProducts(userId);
}

async function assertOwnership(userId: string, productId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.userId !== userId) {
    throw new ApiError(404, "Product not found");
  }
}

function toProduct(p: { id: string; name: string; amount: number; comment: string; order: number }): Product {
  return { id: p.id, name: p.name, amount: p.amount, comment: p.comment, order: p.order };
}
