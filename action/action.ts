"use server";

import { ICate, IItem } from "@/interface";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export const getCurrentUserAction = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const getCategoriesAction = async () => {
  return await prisma.category.findMany();
};

export const createCategoriesAction = async ({
  title,
  imageUrl,
  userId,
}: {
  title: string;
  imageUrl: string;
  userId: string | null;
}) => {
  await prisma.category.create({
    data: {
      title,
      imageUrl,
      userId: userId as string,
    },
  }),
    revalidatePath("/");
};
export const updateCategoriesAction = async (cate: ICate) => {
  await prisma.category.update({
    data: {
      title: cate.title,
      imageUrl: cate.imageUrl,
    },
    where: {
      id: cate.id,
    },
  }),
    revalidatePath("/");
};

export const deleteCategoriesAction = async ({ id }: { id: string }) => {
  await prisma.category.delete({
    where: {
      id,
    },
  }),
    revalidatePath("/");
};

export const getItemsAction = async (id: string) => {
  return await prisma.item.findMany({
    where: {
      categoryId: id,
    },
  });
};

export const createItemsAction = async ({
  title,
  price,
  imageUrl,
  userId,
  categoryId,
}: {
  title: string;
  price: number;
  imageUrl: string;
  userId: string | null;
  categoryId: string;
}) => {
  // generate a slug from the name to satisfy the required 'slug' field on ItemCreateInput

  await prisma.item.create({
    data: {
      title,
      price,
      imageUrl,
      userId: userId as string,
      categoryId,
    },
  }),
    revalidatePath("/");
};

export const updateItemsAction = async (item: IItem) => {
  await prisma.item.update({
    where: {
      id: item.id,
    },
    data: {
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
    },
  }),
    revalidatePath(`/CategoryPage/${item.categoryId}`);
};

export const deleteItemsAction = async ({ id }: { id: string }) => {
  await prisma.item.delete({
    where: {
      id,
    },
  }),
    revalidatePath("/");
};
