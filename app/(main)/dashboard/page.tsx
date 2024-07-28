"use client";
import CodeSnippetCard, {
  CodeSnippetCardSkeleton,
} from "@/components/code-snippet-card";
import { useGetNotes } from "@/features/notes/api/use-get-notes";
import React from "react";

export default function DashboardPage() {
  const { data: noteQuery, isLoading } = useGetNotes();

  const loading = isLoading;
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeSnippetCardSkeleton />
        <CodeSnippetCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {noteQuery?.map((note) => (
        <CodeSnippetCard
          key={note.id}
          title={note.title}
          code={note.code}
          language={note.language}
          description={note.description}
          createdAt={note.createdAt}
          topics={note.topics}
          userId={note.userId}
        />
      ))}
    </div>
  );
}
