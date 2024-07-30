import React from "react";
import { Button } from "./ui/button";
import { ArchiveRestore, Heart, HeartOff, Pen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ActionTooltip from "./action-tooltip";
import { useOpenNote } from "@/features/notes/hooks/use-open-note";
import { useSoftDeleteNote } from "@/features/notes/api/use-soft-delete-note";
import { useRestoreNote } from "@/features/notes/api/use-restore-note";
import { useDeleteNote } from "@/features/notes/api/use-delete-note";
import { useCreateFavorite } from "@/features/notes/api/use-create-favorite";
import { Favorite } from "@/types";
import { useDeleteFavorite } from "@/features/notes/api/use-delete-favorite";

type CardActionsProps = {
  isOwner: boolean;
  id: string;
  isPreDeleted?: boolean | null;
  favorite?: Favorite | null;
};

export default function CardActions({
  isOwner,
  id,
  isPreDeleted,
  favorite,
}: CardActionsProps) {
  const { onOpen } = useOpenNote();
  const softDeleteMutation = useSoftDeleteNote(id!);
  const deleteMutation = useDeleteNote(id!);
  const deleteFavoriteMutation = useDeleteFavorite(favorite?.id!);
  const restoreMutation = useRestoreNote(id!);
  const createFavoriteMutation = useCreateFavorite();

  const onSoftDelete = () => {
    softDeleteMutation.mutate(id!);
  };
  const onDelete = () => {
    deleteMutation.mutate(id!);
  };
  const onDeleteFavorite = () => {
    deleteFavoriteMutation.mutate(favorite?.id!);
  };
  const onRestore = () => {
    restoreMutation.mutate(id!);
  };
  const onCreateFavorite = () => {
    createFavoriteMutation.mutate({ noteId: id });
  };

  const pending =
    softDeleteMutation.isPending ||
    restoreMutation.isPending ||
    deleteMutation.isPending ||
    deleteFavoriteMutation.isPending ||
    createFavoriteMutation.isPending;

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
              onClick={onDelete}
              disabled={pending}
            >
              <Trash2 className="size-4" />
            </Button>
          </ActionTooltip>
        </div>
      ) : (
        <>
          {favorite ? (
            <ActionTooltip title="Remove from favorite">
              <Button
                variant={"ghost"}
                size={"sm"}
                disabled={pending}
                onClick={onDeleteFavorite}
              >
                <HeartOff className="size-4" />
              </Button>
            </ActionTooltip>
          ) : (
            <ActionTooltip title="Favorite">
              <Button
                variant={"ghost"}
                size={"sm"}
                disabled={pending}
                onClick={onCreateFavorite}
              >
                <Heart className="size-4" />
              </Button>
            </ActionTooltip>
          )}

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
