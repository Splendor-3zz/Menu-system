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

    image: z
    .instanceof(File, { message: "Please upload an image file." })
    .refine((f) => f.size > 0, "File is empty.")
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Only JPG/PNG/WebP are allowed."
    )
    .refine((f) => f.size <= 2 * 1024 * 1024, "Max size is 2MB."),
    });

    export const categoryUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z
    .instanceof(File)
    .optional()
    .refine((f) => !f || f.type.startsWith("image/"), "File must be an image")
    .refine((f) => !f || f.size <= 2 * 1024 * 1024, "Max size is 2MB"),
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

    image: z
    .instanceof(File)
    .optional()
    .refine((f) => !f || f.type.startsWith("image/"), "File must be an image")
    .refine((f) => !f || f.size <= 2 * 1024 * 1024, "Max size is 2MB"),
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

    image: z
    .instanceof(File)
    .optional()
    .refine((f) => !f || f.type.startsWith("image/"), "File must be an image")
    .refine((f) => !f || f.size <= 2 * 1024 * 1024, "Max size is 2MB"),
    price: z.number() .min(1, { message: "Price must be at least 1."})
    });

    export const cartFormSchema = z.object({

    quantity: z .number() .min(1,{message: "quantity can't be 0 or empty"})
    
    });

export type categoryFormValues = z.infer<typeof categoryFormSchema>;
export type categoryUpdateValues = z.infer<typeof categoryUpdateSchema>;
export type itemFormValues = z.infer<typeof itemFormSchema>;
export type itemEditFormValues = z.infer<typeof itemEditFormSchema>;
export type cartFormValues = z.infer<typeof cartFormSchema>;
