import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.notes)[":id"]["$put"]>;
type RequestType = InferRequestType<
  (typeof client.api.notes)[":id"]["$put"]
>["json"];

export const useEditNote = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.notes[":id"]["$put"]({
        param: {
          id,
        },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Code snippet updated successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["notes", { id }] });
    },
    onError: () => {
      toast.error("Could not update the code snippet");
    },
  });

  return mutation;
};
