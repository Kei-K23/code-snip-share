import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { insertNotesSchema } from "@/db/schema";
import { z } from "zod";
import { useNewNote } from "../hooks/use-new-note";
import { useCreateNote } from "../api/use-create-note";
import NoteCreateForm from "./note-create-form";

const formSchema = insertNotesSchema.omit({
  id: true,
  isPreDeleted: true,
  userId: true,
});

type FormValues = z.input<typeof formSchema>;

export default function NoteCreateSheet() {
  const { isOpen, onClose } = useNewNote();
  const mutation = useCreateNote();

  const onSubmit = (values: FormValues) => {
    console.log(values);

    // mutation.mutate(values, {
    //   onSuccess: () => {
    //     onClose();
    //   },
    // });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new Snippet</SheetTitle>
          <SheetDescription>
            Create a new snippet and share with your friends
          </SheetDescription>
        </SheetHeader>
        <NoteCreateForm
          onSubmit={onSubmit}
          defaultValue={{
            title: "",
            description: "",
            code: "",
            language: "",
          }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
}
