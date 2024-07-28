import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetNote = (id: string) => {
  const query = useQuery({
    queryKey: ["notes", { id }],
    queryFn: async () => {
      const response = await client.api.notes[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
