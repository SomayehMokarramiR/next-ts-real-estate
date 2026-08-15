"use client";

import { Heart } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";

import { useCheckFavorite } from "@/hooks/useCheckFavorite";

type Props = {
  propertyId: string;
  isFavorite?: boolean;
};

export default function PropertyFavoriteButton({
  propertyId,
  isFavorite = false,
}: Props) {
  const queryClient = useQueryClient();

  const { data: favoriteData, isLoading: checkingFavorite } =
    useCheckFavorite(propertyId);

  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  const favorite = favoriteData?.success
    ? favoriteData.isFavorite
    : localFavorite;

  const addFavoriteMutation = useAddFavorite();

  const removeFavoriteMutation = useRemoveFavorite();

  const loading =
    addFavoriteMutation.isPending ||
    removeFavoriteMutation.isPending ||
    checkingFavorite;

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    const nextValue = !favorite;

    // تغییر سریع UI
    setLocalFavorite(nextValue);

    if (nextValue) {
      addFavoriteMutation.mutate(propertyId, {
        onSuccess: () => {
          queryClient.setQueryData(["check-favorite", propertyId], {
            success: true,
            isFavorite: true,
          });

          Swal.fire({
            icon: "success",
            title: "موفق",
            text: "به علاقه‌مندی‌ها اضافه شد",
            timer: 1500,
            showConfirmButton: false,
          });
        },

        onError: (error) => {
          setLocalFavorite(false);

          Swal.fire({
            icon: "error",
            title: "خطا",
            text:
              error instanceof Error
                ? error.message
                : "خطا در افزودن علاقه‌مندی",
          });
        },
      });
    } else {
      removeFavoriteMutation.mutate(propertyId, {
        onSuccess: () => {
          queryClient.setQueryData(["check-favorite", propertyId], {
            success: true,
            isFavorite: false,
          });

          Swal.fire({
            icon: "success",
            title: "موفق",
            text: "از علاقه‌مندی‌ها حذف شد",
            timer: 1500,
            showConfirmButton: false,
          });
        },

        onError: (error) => {
          setLocalFavorite(true);

          Swal.fire({
            icon: "error",
            title: "خطا",
            text:
              error instanceof Error ? error.message : "خطا در حذف علاقه‌مندی",
          });
        },
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleFavorite}
      disabled={loading}
      aria-label={favorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className="
        absolute
        top-3
        left-3
        z-20
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        bg-white/90
        shadow
        transition
        hover:scale-110
        disabled:opacity-50
      "
    >
      <Heart
        size={20}
        className={favorite ? "fill-red-500 text-red-500" : "text-gray-600"}
      />
    </button>
  );
}
