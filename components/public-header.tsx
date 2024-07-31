"use client";

import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { LayoutDashboard, Loader2, PlusCircle } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { useNewNote } from "@/features/notes/hooks/use-new-note";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PublicHeader() {
  const { onOpen } = useNewNote();
  const { resolvedTheme } = useTheme();

  return (
    <header className="sticky top-0 flex h-14 items-center gap-2 border-b bg-muted/90 px-4 lg:h-[60px] lg:px-6 z-[100]">
      <Link
        href={"/dashboard"}
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "flex items-center gap-2"
        )}
      >
        <LayoutDashboard className="size-5" />
      </Link>
      <Button
        variant={"outline"}
        size={"sm"}
        className="flex items-center gap-2"
        onClick={() => onOpen()}
      >
        <PlusCircle className="size-5" />
        <span className="sr-only">Snippet</span>
      </Button>
      <ModeToggle />
      <ClerkLoaded>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            // @ts-ignore
            baseTheme: resolvedTheme === "dark" && dark,
          }}
        />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-6 animate-spin " />
      </ClerkLoading>
    </header>
  );
}
