import z from "zod";

export const categoryFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "title must be at least 5 characters.",
    })
    .max(30, {
      message: "title must not be longer than 30 characters.",
    }),

    imageUrl: 
    z.string()
    .url({
        message: "imageUrl must be a valid URL.",
    }),
    
    });

    export const itemFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "title must be at least 5 characters.",
    })
    .max(30, {
      message: "title must not be longer than 30 characters.",
    }),

    imageUrl: 
    z.string()
    .url({
        message: "imageUrl must be a valid URL.",
    }),
    price: z.number() .min(1, { message: "Price must be at least 1."}),
    categoryId: z.string() .min(1, { message: "Please select a category."})
    
    });
    
    export const itemEditFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "title must be at least 5 characters.",
    })
    .max(30, {
      message: "title must not be longer than 30 characters.",
    }),

    imageUrl: 
    z.string()
    .url({
        message: "imageUrl must be a valid URL.",
    }),
    price: z.number() .min(1, { message: "Price must be at least 1."})
    });

export type categoryFormValues = z.infer<typeof categoryFormSchema>;
export type itemFormValues = z.infer<typeof itemFormSchema>;
export type itemEditFormValues = z.infer<typeof itemEditFormSchema>;
