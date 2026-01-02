"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemEditFormSchema, itemEditFormValues } from "../../schema";
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
import { updateItemsAction } from "../../../action/action";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/categoryDialog";
import { IItem } from "@/interface";
import { toast } from "sonner";

export function EditFormItem({ item }: { item: IItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: itemEditFormValues) => {
    

    const fd = new FormData();

    fd.append("id", item.id);
    fd.append("title", data.title);
    fd.append("price", String(data.price));
    // only append if user selected a new file
    if (data.image) fd.append("image", data.image);
    fd.append("categoryId", item.categoryId);

    await updateItemsAction(fd);
    setIsOpen(false);
    toast.info("the Item has been edited successfully.", {
      richColors: true,
      position: "top-center",
    });
  };

  const form = useForm<itemEditFormValues>({
    resolver: zodResolver(itemEditFormSchema),
    defaultValues: {
      title: item.title,
      image: undefined,
      price: item.price,
    },
    mode: "onChange",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="my-5 cursor-pointer bg-blue-400 hover:bg-blue-300 w-20">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogTitle>Edit Item</DialogTitle>
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
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                        form.setValue("image", file, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="cursor-pointer">
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
