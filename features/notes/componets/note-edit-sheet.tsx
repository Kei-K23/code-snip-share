import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { insertNotesWithTopicsSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateNote } from "../api/use-create-note";
import NoteCreateForm from "./note-create-form";
import { useEditNote } from "../hooks/use-edit-note";
import { useGetNote } from "../api/use-get-note";
import { Loader } from "lucide-react";

type FormValues = z.input<typeof insertNotesWithTopicsSchema>;

export default function NoteEditSheet() {
  const { isOpen, onClose, id } = useEditNote();
  const { data: noteQuery, isLoading } = useGetNote(id!);

  const mutation = useCreateNote();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValue = noteQuery
    ? {
        title: noteQuery[0]?.title,
        description: noteQuery[0]?.description,
        code: noteQuery[0]?.code,
        language: noteQuery[0]?.language,
        topics: noteQuery[0]?.topics.map((topic) => ({
          value: topic.id,
          label: topic.name,
        })),
      }
    : {
        title: "",
        description: "",
        code: "",
        language: "",
        topics: [],
      };

  const loading = isLoading || mutation.isPending;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit the Snippet</SheetTitle>
          <SheetDescription>
            Edit a new snippet and share with your friends
          </SheetDescription>
        </SheetHeader>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader className="size-5 animate-spin" />
          </div>
        ) : (
          <NoteCreateForm
            id={noteQuery ? noteQuery[0]?.id : ""}
            onSubmit={onSubmit}
            defaultValue={defaultValue}
            disabled={loading}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
