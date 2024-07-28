import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetSoftDeletedNotes = () => {
  const query = useQuery({
    queryKey: ["notes", "soft-delete"],
    queryFn: async () => {
      const response = await client.api.notes["soft-delete"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch soft deleted notes");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
