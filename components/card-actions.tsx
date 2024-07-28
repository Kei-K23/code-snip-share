import React from "react";
import { Button } from "./ui/button";
import { ArchiveRestore, Heart, Pen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ActionTooltip from "./action-tooltip";
import { useOpenNote } from "@/features/notes/hooks/use-open-note";
import { useSoftDeleteNote } from "@/features/notes/api/use-soft-delete-note";
import { useRestoreNote } from "@/features/notes/api/use-restore-note";

type CardActionsProps = {
  isOwner: boolean;
  id: string;
  isPreDeleted?: boolean | null;
};

export default function CardActions({
  isOwner,
  id,
  isPreDeleted,
}: CardActionsProps) {
  const { onOpen } = useOpenNote();
  const softDeleteMutation = useSoftDeleteNote(id!);
  const restoreMutation = useRestoreNote(id!);

  const onSoftDelete = () => {
    softDeleteMutation.mutate(id!);
  };
  const onRestore = () => {
    restoreMutation.mutate(id!);
  };

  const pending = softDeleteMutation.isPending || restoreMutation.isPending;

  return (
    <div className="flex items-center gap-x-2">
      {isPreDeleted ? (
        <div
          className={cn("items-center gap-x-2", isOwner ? "flex" : "hidden")}
        >
          <ActionTooltip title="Restore">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={onRestore}
              disabled={pending}
            >
              <ArchiveRestore className="size-4" />
            </Button>
          </ActionTooltip>
          <ActionTooltip title="Permanent Delete">
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={onSoftDelete}
              disabled={pending}
            >
              <Trash2 className="size-4" />
            </Button>
          </ActionTooltip>
        </div>
      ) : (
        <>
          <ActionTooltip title="Favorite">
            <Button variant={"ghost"} size={"sm"} disabled={pending}>
              <Heart className="size-4" />
            </Button>
          </ActionTooltip>
          <div
            className={cn("items-center gap-x-2", isOwner ? "flex" : "hidden")}
          >
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
                onClick={onSoftDelete}
                disabled={pending}
              >
                <Trash2 className="size-4" />
              </Button>
            </ActionTooltip>
          </div>
        </>
      )}
    </div>
  );
}
