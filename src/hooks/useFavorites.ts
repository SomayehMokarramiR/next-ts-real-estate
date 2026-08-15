import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/services/favoriteService";

/*
=========================
Get Favorites
=========================
*/

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
}

/*
=========================
Add Favorite
=========================
*/

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });
}

/*
=========================
Remove Favorite
=========================
*/

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });
}
