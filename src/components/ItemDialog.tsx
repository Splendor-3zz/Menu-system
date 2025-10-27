import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { itemFormSchema, itemFormValues } from "../schema"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { createItemsAction } from "../../action/action"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/categoryDialog"



export function ItemDialog() {
    
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async ({title, imageUrl, userId, price, categoryId}:itemFormValues) => {
        await createItemsAction({title, imageUrl, userId, price, categoryId});
        setIsOpen(false);
        form.reset();
    }

const defaultValues: Partial<itemFormValues> = {
    title: "",
    imageUrl: "",
    price: 0,
    userId: "68f55730cdad9b4fb1d95884",
    categoryId: "",
}

    const form = useForm<itemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const handleButton = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
        e.preventDefault();       // stop the link navigation
        e.stopPropagation();      // stop click bubbling
        // your edit logic here...
      };
     
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Form {...form}>
      <form onClick={handleButton}>
        <DialogTrigger asChild>
          <Button variant="outline" className="my-5 cursor-pointer w-20">Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Input type="number" placeholder="1" value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
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
        <Button type="submit" className="cursor-pointer">Submit</Button>
      </form>
    </Form>
        </DialogContent>
      </form>
        </Form> 
    </Dialog>
  )
}
