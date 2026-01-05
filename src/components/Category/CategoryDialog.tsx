"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/categoryDialog";
import { Plus } from "lucide-react";
import { createCategoriesAction } from "../../../action/action";
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
import { toast } from "sonner";

export function CategoryDialog({ userId }: { userId: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: categoryFormValues) => {

    if (!values.image) {
      form.setError("image", { message: "Image is required." });
      return;
    }

    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("image", values.image);
    if (userId) fd.append("userId", userId);

    await createCategoriesAction(fd);
    setIsOpen(false);
    form.reset();
    toast.success("the CATEGORY has been created successfully.", {
      richColors: true,
      position: "top-center",
    });
  };

  const form = useForm<categoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
      image: undefined,
    },
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
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            form.setValue("image", file, {
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
