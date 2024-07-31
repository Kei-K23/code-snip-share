import React from "react";
import { Button } from "./ui/button";
import { ArchiveRestore, Heart, HeartOff, Pen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ActionTooltip from "./action-tooltip";
import { useOpenNote } from "@/features/notes/hooks/use-open-note";
import { useSoftDeleteNote } from "@/features/notes/api/use-soft-delete-note";
import { useRestoreNote } from "@/features/trash/api/use-restore-note";
import { useDeleteNote } from "@/features/trash/api/use-delete-note";
import { useCreateFavorite } from "@/features/favorites/api/use-create-favorite";
import { Favorite } from "@/types";
import { useDeleteFavorite } from "@/features/favorites/api/use-delete-favorite";
import useConfirm from "@/hooks/use-confirm";

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
  const [DeleteConfirmDialog, deleteConfirm] = useConfirm({
    title: "Are you sure?",
    message: "This action will delete your code snippet permanently",
  });

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
    <>
      <DeleteConfirmDialog />
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
                onClick={async () => {
                  const isOk = await deleteConfirm();
                  if (isOk) {
                    onDelete();
                  }
                }}
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
              className={cn(
                "items-center gap-x-2",
                isOwner ? "flex" : "hidden"
              )}
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
    </>
  );
}
