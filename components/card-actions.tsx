import React from "react";
import { Button } from "./ui/button";
import { Heart, Pen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ActionTooltip from "./action-tooltip";
import { useOpenNote } from "@/features/notes/hooks/use-open-note";
import { useSoftDeleteNote } from "@/features/notes/api/use-soft-delete-note";

type CardActionsProps = {
  isOwner: boolean;
  id: string;
};

export default function CardActions({ isOwner, id }: CardActionsProps) {
  const { onOpen } = useOpenNote();
  const softDeleteMutation = useSoftDeleteNote(id!);

  const onDelete = () => {
    softDeleteMutation.mutate(id!);
  };

  const pending = softDeleteMutation.isPending;

  return (
    <div className="flex items-center gap-x-2">
      <ActionTooltip title="Favorite">
        <Button variant={"ghost"} size={"sm"} disabled={pending}>
          <Heart className="size-4" />
        </Button>
      </ActionTooltip>
      <div className={cn("items-center gap-x-2", isOwner ? "flex" : "hidden")}>
        <ActionTooltip title="Edit">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => onOpen(id)}
            disabled={pending}
          >
            <Pen className="size-4" />
          </Button>
        </ActionTooltip>
        <ActionTooltip title="Delete">
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={onDelete}
            disabled={pending}
          >
            <Trash2 className="size-4" />
          </Button>
        </ActionTooltip>
      </div>
    </div>
  );
}
