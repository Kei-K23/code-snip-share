"use client";

import NoteCreateSheet from "@/features/notes/componets/note-create-sheet";
import { useEffect, useState } from "react";

export default function SheetsProvider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <NoteCreateSheet />
    </>
  );
}
