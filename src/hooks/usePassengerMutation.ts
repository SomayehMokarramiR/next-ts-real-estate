import { useMutation } from "@tanstack/react-query";

export function useUpdatePassenger() {
  return useMutation({
    mutationFn: async ({
      id,
      phone,
      email,
    }: {
      id: string;
      phone: string;
      email: string;
    }) => {
      const res = await fetch(`/api/passengers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          email,
        }),
      });

      if (!res.ok) throw new Error();

      return res.json();
    },
  });
}
