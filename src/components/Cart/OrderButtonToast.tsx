"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { placeOrderAction } from "../../../action/action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useUser, SignInButton } from "@clerk/nextjs";

interface IProps {}

const schema = z.object({
  address: z.string().min(5, "Enter your address"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+90|0)?5\d{9}$/, "Enter a valid Turkish phone number"),
});

type Values = z.infer<typeof schema>;

const OrderButtonToast = ({}: IProps) => {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { address: "", phone: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: Values) => {
    try {
      await placeOrderAction(values); // server action should update cart + create order
      toast.success("Your order was placed successfully.", {
        richColors: true,
        position: "top-center",
      });
      form.reset();
    } catch (e: any) {
      toast.error(e?.message ?? "Order failed", {
        richColors: true,
        position: "top-center",
      });
    }
  };

  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="flex justify-center mt-6">
        <SignInButton mode="modal">
          <Button>Submit</Button>
        </SignInButton>
      </div>
    );
  }

  return (
    // <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6 space-y-3">
    //   <Input placeholder="your address, Only in Istanbul" {...form.register("address")} />
    //   <Input placeholder="Phone" {...form.register("phone")} />
    //   <Button
    //   className="mt-5 bg-green-500 hover:bg-green-400 cursor-pointer"
    //   type="submit"
    // >
    //   Place Order
    //   </Button>
    // </form>
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col text-center space-y-8"
        >
          <div className="flex items-baseline gap-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address:</FormLabel>
                  <FormControl>
                    <Input placeholder="your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No:</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="your phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrderButtonToast;
