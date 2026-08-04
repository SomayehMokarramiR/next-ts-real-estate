"use client";

import { useEffect, useState } from "react";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";
import ProgressNavbar from "../modules/navbarProgress/ProgressNavbar";
import Footer from "./footer/Footer";

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { progress } = useReserveProgress();

  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;

    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <>
      <ProgressNavbar dark={dark} setDark={setDark} progress={progress} />

      <main>{children}</main>
      <Footer />
    </>
  );
}
