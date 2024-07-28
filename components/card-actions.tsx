import React from "react";
import { Button } from "./ui/button";
import { Heart, Pen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
type CardActionsProps = {
  isOwner: boolean;
};

export default function CardActions({ isOwner }: CardActionsProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Button variant={"ghost"} size={"sm"}>
        <Heart className="size-5" />
      </Button>
      <div className={cn(isOwner ? "block" : "hidden")}>
        <Button variant={"ghost"} size={"sm"}>
          <Pen className="size-5" />
        </Button>
        <Button variant={"destructive"} size={"sm"}>
          <Trash2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
