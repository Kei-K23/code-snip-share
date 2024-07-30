import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.favorites.$post>;
type RequestType = InferRequestType<typeof client.api.favorites.$post>["json"];

export const useCreateFavorite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.favorites.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Successfully added to favorites lists");
      // Revalidate the fetch functions
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("Could not add the snippet to favorites lists");
    },
  });

  return mutation;
};
