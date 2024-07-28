import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTopics = () => {
  const query = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const response = await client.api.topics.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
