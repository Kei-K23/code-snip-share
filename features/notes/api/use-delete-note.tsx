import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteNote = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api.notes[":id"]["$delete"]({
        param: {
          id,
        },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Code snippet permanently deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["notes", { id }] });
    },
    onError: () => {
      toast.error("Could not delete the code snippet");
    },
  });

  return mutation;
};
