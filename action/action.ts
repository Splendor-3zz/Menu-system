"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getCategoriesAction = async () => {
    return await prisma.category.findMany()
}

export const createCategoriesAction = async ({title, imageUrl,userId}:{title: string, imageUrl: string, userId: string}) => {
    await prisma.category.create({
        data: {
            title,
            imageUrl,
            user: {
                connect: { id: userId }
            }
        }
    })
}
export const updateCategoriesAction = async () => {
    
}

export const deleteCategoriesAction = async () => {
    
}

export const getItemsAction = async (id: string) => {
    return await prisma.item.findMany({
        where: {
            categoryId: id
        }
    }
    )
}

export const createItemsAction = async ({title, price, imageUrl, userId, categoryId}: {title: string, price: number, imageUrl: string, userId:string, categoryId: string}) => {
    // generate a slug from the name to satisfy the required 'slug' field on ItemCreateInput
    const slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    await prisma.item.create({
        data: {
            title,
            slug,
            price,
            imageUrl,
            user: {
                connect: {id: userId}
            },
            category: {
                connect: { id: categoryId}
            }
        }
    })
    console.log("Creating item on server:", { title, categoryId });
}

export const updateItemsAction = async () => {
    
}

export const deleteItemsAction = async () => {
    
}