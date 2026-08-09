import { useMutation } from "@tanstack/react-query";

import { createPayment } from "@/services/paymentService";

export function useCreatePayment() {
  return useMutation({
    mutationFn: createPayment,
  });
}
