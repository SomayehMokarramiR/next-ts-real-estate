import { useQuery } from "@tanstack/react-query";
import { checkFavorite } from "@/services/favoriteService";

export function useCheckFavorite(propertyId: string) {
  return useQuery({
    queryKey: ["check-favorite", propertyId],

    queryFn: () => checkFavorite(propertyId),

    enabled: Boolean(propertyId),

    staleTime: 0,

    gcTime: 0,

    refetchOnMount: true,
  });
}
