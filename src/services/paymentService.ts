export type CreatePaymentPayload = {
  reservationId: string;
  amount: number;
};

export async function createPayment(data: CreatePaymentPayload) {
  const res = await fetch("/api/payments/create", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "خطا در ایجاد پرداخت");
  }

  return result;
}
