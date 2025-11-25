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
import { ICate, IItem } from "@/interface";
import {
  deleteCategoriesAction,
  deleteItemsAction,
} from "../../../action/action";
import { Button } from "../ui/button";
import { toast } from "sonner";

const DeleteButton = ({ cate }: { cate: ICate }) => {
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
            category and the items inside of it and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteCategoriesAction({ id: cate.id });
              toast.success("the Category has been deleted.");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
