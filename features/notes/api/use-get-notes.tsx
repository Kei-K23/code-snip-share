import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetNotes = () => {
  const query = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await client.api.notes.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
