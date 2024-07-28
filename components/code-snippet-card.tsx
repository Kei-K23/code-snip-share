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

type CodeSnippetCardProps = {
  title: string;
  description: string;
  language: string;
  code: string;
  createdAt: Date | string | null;
  topics?: { id: string; name: string }[];
  userId: string;
};

export default function CodeSnippetCard({
  title,
  description,
  language,
  code,
  createdAt,
  topics,
  userId,
}: CodeSnippetCardProps) {
  const { resolvedTheme } = useTheme();
  const { userId: authUserId } = useAuth();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardActions isOwner={authUserId === userId} />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {topics?.map((topic) => (
            <Badge key={topic.id}>{topic.name}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-[16px]">{description}</p>
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
