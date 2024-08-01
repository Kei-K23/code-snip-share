"use client";

import React from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  CodeSquareIcon,
  LayoutDashboard,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { useNewNote } from "@/features/notes/hooks/use-new-note";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";

export default function PublicHeader() {
  const { onOpen } = useNewNote();
  const { resolvedTheme } = useTheme();

  return (
    <header className="sticky top-0 h-14 flex items-center justify-between gap-2 border-b bg-muted/90 px-4 lg:h-[60px] lg:px-6 z-10">
      <Link href="/community" className="flex items-center gap-2 font-semibold">
        <CodeSquareIcon className="h-6 w-6" />
        <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
          CodeSnipShare
        </span>
      </Link>

      <div className="flex items-center gap-2">
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
      </div>
    </header>
  );
}
