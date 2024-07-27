"use client";
import Link from "next/link";
import { Bell, CodeSquareIcon, Loader2, Menu, Search } from "lucide-react";

import { FaCode, FaHeart, FaTrash } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MainLayoutProps = {
  children: React.ReactNode;
};

const NAVIGATION_LINKS = [
  {
    link: "/dashboard",
    label: "All snippets",
    Icon: FaCode,
  },
  {
    link: "/favorites",
    label: "Favorites",
    Icon: FaHeart,
  },
  {
    link: "/trash",
    label: "Trash",
    Icon: FaTrash,
  },
];

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <CodeSquareIcon className="h-6 w-6" />
              <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                CodeSnipShare
              </span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {NAVIGATION_LINKS.map(({ link, label, Icon }) => (
                <Link
                  key={label}
                  href={link}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === link && "text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <CodeSquareIcon className="h-6 w-6 " />
                  <span className="sr-only bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
                    CodeSnipShare
                  </span>
                </Link>
                {NAVIGATION_LINKS.map(({ link, label, Icon }) => (
                  <Link
                    key={label}
                    href={link}
                    className={cn(
                      "mx-[-0.65rem] text-sm flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                      pathname === link && "text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
