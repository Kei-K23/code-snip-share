"use client";
import CodeSnippetCard, {
  CodeSnippetCardSkeleton,
} from "@/components/code-snippet-card";
import { useGetSoftDeletedNotes } from "@/features/trash/api/use-get-soft-deleted-notes";
import React from "react";

export default function TrashPage() {
  const { data: noteQuery, isLoading } = useGetSoftDeletedNotes();

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
        <div className="flex flex-1 justify-center items-center">
          <p className="text-center text-muted-foreground">
            No trash code snippet.
          </p>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
              user={note.user}
            />
          ))}
        </div>
      );
    }
  }
}
