"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/categoryDialog";
import { updateCategoriesAction } from "../../../action/action";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema, categoryFormValues, categoryUpdateSchema, categoryUpdateValues } from "@/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICate } from "@/interface";
import { toast } from "sonner";

export function EditFormCate({ cate }: { cate: ICate }) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: categoryUpdateValues) => {
    const fd = new FormData();
    fd.append("id", cate.id);
    fd.append("title", data.title);

    // only append if user selected a new file
    if (data.image) fd.append("image", data.image);

    await updateCategoriesAction(fd);
    setIsOpen(false);
    toast.success("the Category has been edited successfully.");
  };

  const form = useForm<categoryUpdateValues>({
    resolver: zodResolver(categoryUpdateSchema),
    defaultValues: {
      title: cate.title,
      image: undefined,
    },
    mode: "onChange",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="my-4 sm:my-5 cursor-pointer bg-blue-400 hover:bg-blue-300 w-15 sm:w-20">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogTitle>Edit Category</DialogTitle>
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
