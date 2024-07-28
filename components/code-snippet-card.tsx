"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeEditor from "./code-editor";
import { useTheme } from "next-themes";
import { Badge } from "./ui/badge";

import { format } from "date-fns";
import CardActions from "./card-actions";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

type CodeSnippetCardProps = {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  createdAt: Date | string | null;
  topics?: { id: string; name: string }[];
  userId: string;
  isPreDeleted?: boolean | null;
};

export default function CodeSnippetCard({
  id,
  title,
  description,
  language,
  code,
  createdAt,
  topics,
  userId,
  isPreDeleted,
}: CodeSnippetCardProps) {
  const { resolvedTheme } = useTheme();
  const { userId: authUserId } = useAuth();
  console.log(code);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardActions
            isOwner={authUserId === userId}
            id={id}
            isPreDeleted={isPreDeleted}
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {topics?.map((topic) => (
            <Badge key={topic.id}>{topic.name}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-[16px] line-clamp-3">{description}</p>
        <CodeEditor
          language={language}
          resolvedTheme={resolvedTheme}
          isReadOnly={true}
          defaultValue={code}
        />
        <CardFooter className="p-0 w-full flex items-center justify-between mt-4">
          <Badge className="capitalize" variant={"secondary"}>
            {language}
          </Badge>
          <span>{format(new Date(createdAt!), "MM/dd/yyyy")}</span>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export const CodeSnippetCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="w-[200px] h-4" />
          <Skeleton className="w-[100px] h-4" />
        </div>
        <div>
          <Skeleton className="w-[70px] h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-[300px] h-4 mt-2" />
        <Skeleton className="w-full h-[250px] mt-4" />
        <CardFooter className="p-0 w-full flex items-center justify-between mt-4">
          <Skeleton className="w-[70px] h-4" />
          <Skeleton className="w-[70px] h-4" />
        </CardFooter>
      </CardContent>
    </Card>
  );
};
