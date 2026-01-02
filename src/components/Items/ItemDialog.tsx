"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema, itemFormValues } from "../../schema";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { createItemsAction } from "../../../action/action";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/categoryDialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function ItemDialog({
  categories,
  userId,
}: {
  categories: any[];
  userId: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: itemFormValues) => {
    if (!values.image) {
      // if image is required, make it required in Zod instead
      throw new Error("Image is required");
    }

    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("price", String(values.price));
    fd.append("categoryId", values.categoryId);
    fd.append("image", values.image);
    if (userId) fd.append("userId", userId);
    await createItemsAction(fd);
    setIsOpen(false);
    form.reset();
    toast.success("the ITEM has been created successfully.", {
      richColors: true,
      position: "top-center",
    });
  };

  const form = useForm<itemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: "",
      image: undefined as any,
      price: 0,
    },
    mode: "onChange",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Form {...form}>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full cursor-pointer">
              Add Item <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <DialogTitle>Add an Item</DialogTitle>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="your title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            form.setValue("image", file as any, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="border p-2 rounded-md w-full"
                        >
                          <option value="" className="bg-black">
                            Select category
                          </option>
                          {categories.map((cat) => (
                            <option
                              key={cat.id}
                              value={cat.id}
                              className="bg-black"
                            >
                              {cat.title}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="cursor-pointer">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
