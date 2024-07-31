import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetFavorites = () => {
  const query = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await client.api.favorites.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
