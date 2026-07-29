"use client";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";
import ProgressNavbar from "../modules/navbarProgress/ProgressNavbar";

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { progress } = useReserveProgress();

  return (
    <>
      <ProgressNavbar dark={false} setDark={() => {}} progress={progress} />

      <main>{children}</main>
    </>
  );
}
