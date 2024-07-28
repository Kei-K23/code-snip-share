"use client";
import CodeSnippetCard, {
  CodeSnippetCardSkeleton,
} from "@/components/code-snippet-card";
import { Button } from "@/components/ui/button";
import { useGetNotes } from "@/features/notes/api/use-get-notes";
import { useNewNote } from "@/features/notes/hooks/use-new-note";
import React from "react";

export default function DashboardPage() {
  const { data: noteQuery, isLoading } = useGetNotes();
  const { onOpen } = useNewNote();

  const loading = isLoading;
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeSnippetCardSkeleton />
        <CodeSnippetCardSkeleton />
      </div>
    );
  } else {
    if (!noteQuery?.length) {
      return (
        <div className="flex flex-1 justify-center items-center flex-col gap-y-5">
          <p className="text-center text-muted-foreground">No code snippet.</p>
          <Button onClick={onOpen} variant={"outline"}>
            Create code snippet
          </Button>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {noteQuery?.map((note) => (
            <CodeSnippetCard
              key={note.id}
              id={note.id}
              title={note.title}
              code={note.code}
              language={note.language}
              description={note.description}
              createdAt={note.createdAt}
              topics={note.topics}
              userId={note.userId}
              isPreDeleted={note.isPreDeleted}
            />
          ))}
        </div>
      );
    }
  }
}
