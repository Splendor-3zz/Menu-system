"use server";

import "dotenv/config";
import { ICate, IItem } from "@/interface";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getCurrentUserAction = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

// CATEGORIES ACTIONS ...

export const getAdminCategoriesAction = async () => {
  return await prisma.category.findMany({
    orderBy: { order: "asc" },
  });
};

export const getCategoriesAction = async () => {
  return await prisma.category.findMany({
    where: {
      hiden: false,
    },
    orderBy: { order: "asc" },
  });
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
    revalidatePath("/CategoryPage");
};

export const reorderCategoriesAction = async (orderedIds: string[]) => {
  // orderedIds = array of category IDs in the new order
  const updates = orderedIds.map((id, index) =>
    prisma.category.update({
      where: { id },
      data: { order: index },
    })
  );

  await Promise.all(updates);
  revalidatePath("/AdminSortCategories");
};

export const getSortedCategoriesAction = async () => {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
  });
};

export const deleteCategoriesAction = async ({ id }: { id: string }) => {
  await prisma.category.delete({
    where: {
      id,
    },
  }),
    revalidatePath("/");
};

export const hideCategoryAction = async ({ id }: { id: string }) => {
  const hide = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (hide?.hiden === true) {
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        hiden: false,
      },
    });
  } else {
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        hiden: true,
      },
    });
  }
  revalidatePath("/");
};

export const getCategoryStatuAction = async (id: string) => {
  const hide = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (hide?.hiden === true) {
    return true;
  } else {
    return false;
  }
};

// ITEMS ACTIONS ...

export const getAdminItemsAction = async (id: string) => {
  return await prisma.item.findMany({
    where: {
      categoryId: id,
    },
    orderBy: {
      order: "asc",
    }
  });
};

export const getItemsAction = async (id: string) => {
  return await prisma.item.findMany({
    where: {
      categoryId: id,
      hiden: false,
    },
    orderBy: {
      order: "asc",
    }
  });
};

export const getSortedItemsAction = async () => {
  return prisma.item.findMany({
    orderBy: { order: "asc" },
  });
};

export const updateItemOrderAction = async (
  updates: { id: string; order: number }[],
  categoryId: string
) => {
  for (const item of updates) {
    await prisma.item.update({
      where: { id: item.id },
      data: { order: item.order },
    });
  }

  revalidatePath(`/CategoryPage/${categoryId}`);
};

export const reorderItemsAction = async (orderedIds: string[]) => {
  // orderedIds = array of category IDs in the new order
  const updates = orderedIds.map((id, index) =>
    prisma.item.update({
      where: { id },
      data: { order: index },
    })
  );

  await Promise.all(updates);
  revalidatePath("/AdminSortCategories");
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

export const hideItemAction = async ({ id }: { id: string }) => {
  const hide = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  if (hide?.hiden === true) {
    await prisma.item.update({
      where: {
        id,
      },
      data: {
        hiden: false,
      },
    });
  } else {
    await prisma.item.update({
      where: {
        id,
      },
      data: {
        hiden: true,
      },
    });
  }
  revalidatePath("/");
};

export const getItemStatuAction = async (id: string) => {
  const hide = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  if (hide?.hiden === true) {
    return true;
  } else {
    return false;
  }
};

// CART ACTIONS ...

export const addToCartAction = async (itemId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  let cart = await prisma.cart.findFirst({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, itemId },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, itemId, quantity: 1 },
    });
  }

  revalidatePath("/CartPage");
};

export const getCartAction = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  // Find the user's cart with all items
  return await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          item: true, // this loads the actual product data
        },
      },
    },
  });
};

export const updateCartQuantityAction = async (
  cartItemId: string,
  quantity: number
) => {
  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });

  revalidatePath("/CartPage");
};

export const incrementCartItemAction = async (cartItemId: string) => {
  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { increment: 1 } },
  });
  revalidatePath("/CartPage");
};

export const decrementCartItemAction = async (cartItemId: string) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });
  if (!cartItem) return;

  // If quantity > 1, decrease; if 1, remove item
  if (cartItem.quantity > 1) {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: { decrement: 1 } },
    });
  } else {
    await prisma.cartItem.delete({ where: { id: cartItemId } });
  }

  revalidatePath("/Cart");
};

export const deleteCartAction = async (cartItemId: string) => {
  await prisma.cartItem.delete({ where: { id: cartItemId } });
  revalidatePath("/Cart");
};

export const cartItemsAction = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const cart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });
  if (cart?.items.length === 0) return null;

  return cart?.items.length;
};

// Orders ...

export const placeOrderAction = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  // Find cart and items
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: { include: { item: true } },
    },
  });

  if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

  // Compute total
  const total = cart.items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  // Create order and order items
  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: cart.items.map((ci) => ({
          itemId: ci.itemId,
          quantity: ci.quantity,
          price: ci.item.price,
        })),
      },
    },
  });

  // Clear cart after order
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  revalidatePath("/Cart");
  return order;
};

export const getAllOrdersAction = async () => {
  return await prisma.order.findMany({
    include: {
      items: {
        include: { item: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteOrderAction = async ({ id }: { id: string }) => {
  await prisma.order.delete({
    where: {
      id,
    },
  }),
    revalidatePath("/");
};

export const orderedItemsQuantityAction = async ({
  orderItemId,
}: {
  orderItemId: string;
}) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderItemId,
    },
    include: {
      items: true,
    },
  });

  order?.items.forEach(async (oi) => {
    const item = await prisma.item.findUnique({
      where: {
        id: oi.itemId,
      },
    });
    if (!item) return 0;
    const total = item?.noOfOrders + oi?.quantity;

    await prisma.item.updateMany({
      where: {
        id: oi.itemId,
      },
      data: {
        noOfOrders: total,
      },
    });
  });
  revalidatePath("/");
};
