"use client";

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { itemEditFormSchema, itemEditFormValues } from "../schema"
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
import { updateItemsAction } from "../../action/action"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/categoryDialog"
import { IItem } from "@/interface";



export function EditFormItem({item}: {item: IItem}) {
    
    const [isOpen, setIsOpen] = useState(false);

const defaultValues: Partial<itemEditFormValues> = {
    title: item.title,
    imageUrl: item.imageUrl,
    price: item.price,
    userId: "68f55730cdad9b4fb1d95884",
    // categoryId: item.categoryId,
}

 const onSubmit = async (data:itemEditFormValues) => {
        console.log("Submitting update:", data);

        await updateItemsAction({id: item.id,title: data.title, imageUrl: data.imageUrl, price: data.price});
        setIsOpen(false);
        form.reset();
    }

    const form = useForm<itemEditFormValues>({
    resolver: zodResolver(itemEditFormSchema),
    defaultValues,
    mode: "onChange",
  })
     
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="my-5 cursor-pointer bg-blue-400 hover:bg-blue-300 w-20">Edit</Button>
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
    </Dialog>
  )
}
