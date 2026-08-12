"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService, ContactPayload } from "@/services/contactService";

export const contactKeys = {
  all: ["contact"] as const,
  messages: () => [...contactKeys.all, "messages"] as const,
};

export function useSendContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ContactPayload) =>
      contactService.sendMessage(payload),

    onSuccess: () => {
      // اگر بعداً لیست پیام‌های تماس داشته باشیم،
      // cache آن بعد از ارسال پیام تازه می‌شود.
      queryClient.invalidateQueries({
        queryKey: contactKeys.messages(),
      });
    },
  });
}
