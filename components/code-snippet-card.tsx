"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeEditor from "./code-editor";
import { useTheme } from "next-themes";

type CodeSnippetCardProps = {
  title: string;
  description: string;
  language: string;
  code: string;
  createdAt: Date | string | null;
  topics?: { id: string; name: string }[];
};

export default function CodeSnippetCard({
  title,
  description,
  language,
  code,
  createdAt,
  topics,
}: CodeSnippetCardProps) {
  const { resolvedTheme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <p>{createdAt?.toString()}</p>

        <p>
          {topics?.map((topic) => (
            <span key={topic.id}>{topic.name}</span>
          ))}
        </p>
        <CodeEditor
          language={language}
          resolvedTheme={resolvedTheme}
          isReadOnly={true}
          defaultValue={code}
        />
      </CardContent>
    </Card>
  );
}
