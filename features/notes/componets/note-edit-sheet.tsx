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
import NoteCreateForm from "./note-create-form";
import { useGetNote } from "../api/use-get-note";
import { Loader } from "lucide-react";
import { useOpenNote } from "../hooks/use-open-note";
import { useEditNote } from "../api/use-edit-note";
import { useSoftDeleteNote } from "../api/use-soft-delete-note";

type FormValues = z.input<typeof insertNotesWithTopicsSchema>;

export default function NoteEditSheet() {
  const { isOpen, onClose, id } = useOpenNote();
  const { data: noteQuery, isLoading } = useGetNote(id!);

  const editMutation = useEditNote(id!);
  const softDeleteMutation = useSoftDeleteNote(id!);

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = () => {
    softDeleteMutation.mutate(id!, {
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

  const loading = isLoading;
  const pending = editMutation.isPending || softDeleteMutation.isPending;
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
          <div className="flex flex-1 justify-center items-center">
            <Loader className="size-5 animate-spin" />
          </div>
        ) : (
          <NoteCreateForm
            id={noteQuery ? noteQuery[0]?.id : ""}
            onSubmit={onSubmit}
            onDelete={onDelete}
            defaultValue={defaultValue}
            disabled={pending}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
