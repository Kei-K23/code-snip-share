import React from "react";
import { Button } from "./ui/button";
import { Heart, Pen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ActionTooltip from "./action-tooltip";

type CardActionsProps = {
  isOwner: boolean;
};

export default function CardActions({ isOwner }: CardActionsProps) {
  return (
    <div className="flex items-center gap-x-2">
      <ActionTooltip title="Favorite">
        <Button variant={"ghost"} size={"sm"}>
          <Heart className="size-4" />
        </Button>
      </ActionTooltip>
      <div className={cn("items-center gap-x-2", isOwner ? "flex" : "hidden")}>
        <ActionTooltip title="Edit">
          <Button variant={"ghost"} size={"sm"}>
            <Pen className="size-4" />
          </Button>
        </ActionTooltip>
        <ActionTooltip title="Delete">
          <Button variant={"destructive"} size={"sm"}>
            <Trash2 className="size-4" />
          </Button>
        </ActionTooltip>
      </div>
    </div>
  );
}
