import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNotes = () => {
  const query = useQuery({
    queryKey: ["notes", "all"],
    queryFn: async () => {
      const response = await client.api.notes["all"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch all notes");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
