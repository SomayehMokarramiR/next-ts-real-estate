import { Passenger } from "@/app/components/templates/singleReserveHouse/types";

export async function createPassenger(passenger: Passenger) {
  const res = await fetch("/api/passengers", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(passenger),
  });

  if (!res.ok) {
    throw new Error("create passenger failed");
  }

  return res.json();
}

export async function getPassengers() {
  const res = await fetch("/api/passengers", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("get passengers failed");
  }

  return res.json();
}
