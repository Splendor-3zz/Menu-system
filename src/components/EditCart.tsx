"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/categoryDialog";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
    Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cartFormSchema, cartFormValues } from "@/schema";
import { updateCartAction } from "../../action/action";

interface IProps {}

const EditCart = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultValues: Partial<cartFormValues> = {};

  const form = useForm<cartFormValues>({
    resolver: zodResolver(cartFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: cartFormValues) => {
    console.log("Submitting update:", data);
    await updateCartAction({ id: id, quantity: data.quantity });
    setIsOpen(false);
    form.reset();
    console.log(data);
  };

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
            <DialogTitle>Edit Quantity</DialogTitle>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="your Quantity"
                       onChange={(e) => field.onChange(Number(e.target.value))}
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
};

export default EditCart;
