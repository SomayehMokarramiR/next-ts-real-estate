"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getMyReservations,
  getReservationById,
  deleteReservation,
  updateReservation,
} from "@/services/reservationService";

/* =========================
   My Reservations
========================= */

export function useMyReservations() {
  return useQuery({
    queryKey: ["my-reservations"],
    queryFn: getMyReservations,
    retry: false,
    staleTime: 1000 * 60,
  });
}

/* =========================
   Reservation Details
========================= */

export function useReservation(reservationId: string) {
  return useQuery({
    queryKey: ["reservation", reservationId],

    queryFn: () => getReservationById(reservationId),

    enabled: Boolean(reservationId),

    retry: false,

    staleTime: 1000 * 60,
  });
}

/* =========================
   Delete Reservation
========================= */

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,

    onSuccess: (data) => {
      console.log("DELETE SUCCESS:", data.message);

      queryClient.invalidateQueries({
        queryKey: ["my-reservations"],
      });
    },

    onError: (error) => {
      console.error(
        "DELETE RESERVATION ERROR:",
        error instanceof Error ? error.message : error,
      );
    },
  });
}

/* =========================
   Update Reservation
========================= */

type UpdateReservationVariables = {
  id: string;

  data: {
    propertyId: string;
  };
};

export function useUpdateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateReservationVariables) => {
      return updateReservation(id, data);
    },

    onSuccess: (data, variables) => {
      console.log("UPDATE SUCCESS:", data.message);

      queryClient.invalidateQueries({
        queryKey: ["my-reservations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["reservation", variables.id],
      });
    },

    onError: (error) => {
      console.error(
        "UPDATE RESERVATION ERROR:",

        error instanceof Error ? error.message : error,
      );
    },
  });
}
