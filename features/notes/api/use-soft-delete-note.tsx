import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSoftDeleteNote = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await client.api.notes["soft-delete"][":id"]["$patch"]({
        param: {
          id,
        },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Code snippet delete successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["notes", "all"] });
      queryClient.invalidateQueries({ queryKey: ["notes", { id }] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({
        queryKey: ["notes", "soft-delete"],
      });
    },
    onError: () => {
      toast.error("Could not delete the code snippet");
    },
  });

  return mutation;
};
