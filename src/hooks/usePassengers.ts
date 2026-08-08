import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { createPassenger, getPassengers } from "../services/passengerService";

export function usePassengers() {
  return useQuery({
    queryKey: ["passengers"],

    queryFn: getPassengers,
  });
}

export function useCreatePassenger() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPassenger,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["passengers"],
      });
    },
  });
}
