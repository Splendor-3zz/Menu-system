"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IItem } from "@/interface";
import { Button } from "../ui/button";
import { deleteItemsAction } from "../../../action/action";
import { toast } from "sonner";

const DeleteButtonItem = ({ item }: { item: IItem }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="my-5 cursor-pointer bg-red-500 hover:bg-red-400 w-20">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteItemsAction({ id: item.id });
              toast.error("the Item has been deleted.", {
                richColors: true,
                position: "top-center",
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButtonItem;
