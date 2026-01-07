"use server";

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import path from "path";
import fs from "fs/promises";

import { GUEST_COOKIE } from "@/lib/guestCart";
import crypto from "crypto";
import { cookies } from "next/headers";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getCurrentUserAction = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  // get email from Clerk to store
  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const nameFromClerk =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() ||
    clerkUser.username ||
    clerkUser.fullName ||
    (email ? email.split("@")[0] : null);

  return await prisma.user.upsert({
    where: { id: userId },
    update: { email, title: nameFromClerk }, // keep it synced
    create: {
      id: userId,
      email,
      title: nameFromClerk,
      role: "USER",
    },
  });
};

export const getUserAction = async ({id}: {id: string}) => {

  return await prisma.user.findMany({
    where: {
      id,
    }
  })
}

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

export const createCategoriesAction = async (formData: FormData) => {
  const title = formData.get("title");
  const userId = formData.get("userId");
  const image = formData.get("image"); // File

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("title is required");
  }
  if (typeof userId !== "string" || !userId) {
    throw new Error("userId is required");
  }
  if (!(image instanceof File)) {
    throw new Error("image file is required");
  }
  if (!image.type.startsWith("image/")) {
    throw new Error("file must be an image");
  }

  // Write file to /public/uploads
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = image.name.split(".").pop() || "png";
  const safeName = `${crypto.randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, safeName);
  await fs.writeFile(filePath, buffer);

  // This is what you store in DB
  const imageUrl = `/uploads/${safeName}`;

  await prisma.category.create({
    data: {
      title: title.trim(),
      imageUrl,
      userId,
    },
  });
    revalidatePath("/");
};
export const updateCategoriesAction = async (formData: FormData) => {

  const id = formData.get("id");
  const title = formData.get("title");
  const image = formData.get("image"); // optional

  if (typeof id !== "string") {
    throw new Error("id is required");
  }

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("title is required");
  }

  let imageUrl: string | undefined;

  // Only upload if a new image is provided
  if (image && typeof image === "object" && "arrayBuffer" in image) {
    const file = image as File;

    if (!file.type.startsWith("image/")) {
      throw new Error("file must be an image");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "png";
    const filename = `${crypto.randomUUID()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    imageUrl = `/uploads/${filename}`;
  }

  await prisma.category.update({
    where: { id },
    data: {
      title: title.trim(),
      ...(imageUrl && { imageUrl }), // conditional update
    },
  });
  // await prisma.category.update({
  //   data: {
  //     title: cate.title,
  //     imageUrl: cate.imageUrl,
  //   },
  //   where: {
  //     id: cate.id,
  //   },
  // }),
    revalidatePath("/Categories");
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
  revalidatePath("/DragAndDrop");
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

  revalidatePath(`/Categories/${categoryId}`);
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

// export const createItemsAction = async ({
//   title,
//   price,
//   imageUrl,
//   userId,
//   categoryId,
// }: {
//   title: string;
//   price: number;
//   imageUrl: string;
//   userId: string | null;
//   categoryId: string;
// }) => {
//   await prisma.item.create({
//     data: {
//       title,
//       price,
//       imageUrl,
//       userId: userId as string,
//       categoryId,
//     },
//   }),
//     revalidatePath("/");
// };

export const createItemsAction = async (formData : FormData) => {
  const title = formData.get("title");
  const userId = formData.get("userId");
  const categoryId = formData.get("categoryId");
  const image = formData.get("image"); // File
  const priceRaw = formData.get("price");

if (typeof priceRaw !== "string") {
  throw new Error("price is required");
}

const price = Number(priceRaw);
if (Number.isNaN(price)) {
  throw new Error("price must be a number");
}

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("title is required");
  }
  
  if (typeof categoryId !== "string" || !categoryId) {
    throw new Error("categoryId is required");
  }
  if (typeof userId !== "string" || !userId) {
    throw new Error("userId is required");
  }
  if (!(image instanceof File)) {
    throw new Error("imageUrl file is required");
  }
  if (!image.type.startsWith("image/")) {
    throw new Error("file must be an image");
  }
  // Write file to /public/uploads
 const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = image.name.split(".").pop() || "png";
  const safeName = `${crypto.randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, safeName);
  await fs.writeFile(filePath, buffer);

  // This is what you store in DB
  const imageUrl = `/uploads/${safeName}`;

  await prisma.item.create({
    data: {
      title: title.trim(),
      price,
      imageUrl,
      userId: userId as string,
      categoryId,
    },
  }),
    revalidatePath("/");
};

export const updateItemsAction = async (formData:FormData) => {

  const id = formData.get("id");
  const title = formData.get("title");
  const priceRaw = formData.get("price");
  const image = formData.get("image"); // optional
  const categoryId = formData.get("categoryId");

  if (typeof id !== "string") {
    throw new Error("id is required");
  } 
  if (typeof title !== "string" || !title.trim()) {
    throw new Error("title is required");
  }
  if (typeof priceRaw !== "string") {
    throw new Error("price is required");
  }
  const price = Number(priceRaw);
  if (Number.isNaN(price)) {
    throw new Error("price must be a number");
  } 
  if (typeof categoryId !== "string" || !categoryId) {
    throw new Error("categoryId is required");
  }
  let imageUrl: string | undefined;
  // Only upload if a new image is provided
  if (image && typeof image === "object" && "arrayBuffer" in image) {
    const file = image as File;
    if (!file.type.startsWith("image/")) {
      throw new Error("file must be an image");
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop() || "png";
    const filename = `${crypto.randomUUID()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    imageUrl = `/uploads/${filename}`;
  }
  await prisma.item.update({
    where: {
      id
    },
    data: {
      title: title.trim(),
      price,
      ...(imageUrl && { imageUrl }),
      categoryId,
    },
  }),
    revalidatePath(`/Categories/${categoryId}`);
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

  const store = await cookies();
  let guestId = store.get(GUEST_COOKIE)?.value ?? null;

  // ✅ cookie mutation happens here (top-level action called from client)
  if (!userId && !guestId) {
    guestId = crypto.randomUUID();
    store.set(GUEST_COOKIE, guestId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  // Find or create cart
  let cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { guestId: guestId! },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: userId ? { userId } : { guestId: guestId! },
    });
  }

  // Add or increment cart item
  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, itemId },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, itemId, quantity: 1 },
    });
  }

  revalidatePath("/Cart"); // OR "/CartPage" — must match your real route
};



export const getCartAction = async () => {
  const { userId } = await auth();

  const store = await cookies();
  const guestId = store.get(GUEST_COOKIE)?.value;

  if (!userId && !guestId) return null;

  return prisma.cart.findFirst({
    where: userId ? { userId } : { guestId },
    include: { items: { include: { item: true } } },
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

  revalidatePath("/Cart");
};

export const incrementCartItemAction = async (cartItemId: string) => {
  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { increment: 1 } },
  });
  revalidatePath("/Cart");
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
  const store = await cookies();
  const guestId = store.get(GUEST_COOKIE)?.value ?? null;

  if (userId) {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
    if (!cart) return null;
    return cart.items.reduce((sum: number, ci: { quantity: number }) => {
      return sum + ci.quantity;
    }, 0);
  }

  if (!guestId) return null;

  const guestCart = await prisma.cart.findFirst({
    where: { guestId },
    include: { items: true },
  });

  if (!guestCart) return null
  return guestCart.items.reduce((sum: number, ci: { quantity: number }) => {
  return sum + ci.quantity;
}, 0);

};


// Orders ...

export const placeOrderAction = async ({address, phone}: {address: string, phone: string}) => {
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
    (sum: number, ci: {quantity : number; item : {price : number}}) => sum + ci.item.price * ci.quantity,
    0
  );

  // Create order and order items
  const order = await prisma.order.create({
    data: {
      userId,
      total,
      address,
      phone,
      items: {
        create: cart.items.map((ci : {itemId: string, quantity: number, item: {price: number}}) => ({
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
    
    include: { user: true, items: { include: { item: true }, },},
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

  order?.items.forEach(async (oi: {itemId: string, quantity: number}) => {
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

// ... Marge guest cart to user cart upon sign-in

export const mergeGuestCartIntoUserAction = async () => {
  const { userId } = await auth();
  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (user?.role === "ADMIN") return;

  const store = await cookies();
  const guestId = store.get(GUEST_COOKIE)?.value ?? null;
  if (!guestId) return;

  const guestCart = await prisma.cart.findFirst({
    where: { guestId },
    include: { items: true },
  });

  if (!guestCart || guestCart.items.length === 0) {
    store.set(GUEST_COOKIE, "", { path: "/", maxAge: 0 });
    return;
  }

  let userCart = await prisma.cart.findFirst({ where: { userId } });
  if (!userCart) userCart = await prisma.cart.create({ data: { userId } });

  for (const gi of guestCart.items) {
    const existing = await prisma.cartItem.findFirst({
      where: { cartId: userCart.id, itemId: gi.itemId },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: { increment: gi.quantity } },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: userCart.id, itemId: gi.itemId, quantity: gi.quantity },
      });
    }
  }

  await prisma.cartItem.deleteMany({ where: { cartId: guestCart.id } });
  await prisma.cart.delete({ where: { id: guestCart.id } });

  store.set(GUEST_COOKIE, "", { path: "/", maxAge: 0 });

  revalidatePath("/");
};


