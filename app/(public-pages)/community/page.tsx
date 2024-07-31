"use client";
import CodeSnippetCard, {
  CodeSnippetCardSkeleton,
} from "@/components/code-snippet-card";
import { Button } from "@/components/ui/button";
import { useGetAllNotes } from "@/features/notes/api/use-get-all-notes";
import { useNewNote } from "@/features/notes/hooks/use-new-note";
import React from "react";

export default function CommunityPage() {
  const { data: noteQuery, isLoading } = useGetAllNotes();
  const { onOpen } = useNewNote();

  const loading = isLoading;
  if (loading) {
    return (
      <div className="px-6 mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <CodeSnippetCardSkeleton />
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
            Create new code snippet
          </Button>
        </div>
      );
    } else {
      return (
        <div className="px-6 mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
              favorite={note.favorite}
            />
          ))}
        </div>
      );
    }
  }
}
