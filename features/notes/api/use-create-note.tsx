import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.notes.$post>;
type RequestType = InferRequestType<typeof client.api.notes.$post>["json"];

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.notes.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Snippet created successfully");
      // Revalidate the fetch functions
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("Could not create the snippet");
    },
  });

  return mutation;
};
