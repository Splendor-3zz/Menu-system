"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/categoryDialog";
import { updateCategoriesAction } from "../../action/action";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema, categoryFormValues } from "@/schema";
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


export function EditFormCate({cate}: {cate : ICate}) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: categoryFormValues) => {
    console.log("Submitting update:", data);
    await updateCategoriesAction({id: cate.id, title: data.title, imageUrl: data.imageUrl });
    setIsOpen(false);
    form.reset();
    console.log(data)
  };

  const defaultValues: Partial<categoryFormValues> = {
    title: cate.title,
    imageUrl: cate.imageUrl,
    userId: "68f55730cdad9b4fb1d95884",
  };

  const form = useForm<categoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="my-5 cursor-pointer bg-blue-400 hover:bg-blue-300 w-20">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>image</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          {...field}
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
