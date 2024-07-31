import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteFavorite = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api.favorites[":id"]["$delete"]({
        param: {
          id,
        },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Code snippet is remove from favorite lists");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["notes", "all"] });
      queryClient.invalidateQueries({ queryKey: ["notes", { id }] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["notes", "soft-delete"] });
    },
    onError: () => {
      toast.error("Could not remove the code snippet from favorite");
    },
  });

  return mutation;
};
