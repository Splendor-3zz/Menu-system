"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/categoryDialog";
import { Plus } from "lucide-react";
import { createCategoriesAction } from "../../action/action";
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

export function CategoryDialog({userId}:{userId: string |null}) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async ({ title, imageUrl }: categoryFormValues) => {
    await createCategoriesAction({ title, imageUrl, userId });
    setIsOpen(false);
    form.reset();
  };

  const defaultValues: Partial<categoryFormValues> = {
    title: "",
    imageUrl: "",
  };

  const form = useForm<categoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Form {...form}>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full cursor-pointer">
              Add Category <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <DialogTitle>Add Category</DialogTitle>
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
