"use client";
import CodeSnippetCard from "@/components/code-snippet-card";
import { useGetNotes } from "@/features/notes/api/use-get-notes";
import React from "react";

export default function DashboardPage() {
  const { data: noteQuery, isLoading } = useGetNotes();

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
