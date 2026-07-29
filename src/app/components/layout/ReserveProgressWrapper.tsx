"use client";

import { ReserveProgressProvider } from "@/app/context/ReserveProgressContext";

export default function ReserveProgressWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReserveProgressProvider>{children}</ReserveProgressProvider>;
}
