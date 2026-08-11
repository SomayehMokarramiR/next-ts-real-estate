"use client";

import { useEffect, useState } from "react";

import ProgressNavbar from "./navbarProgress/ProgressNavbar";
import Footer from "./footer/Footer";

import {
  RegisterProgressProvider,
  useRegisterProgress,
} from "@/app/context/RegisterProgressContext";

type Props = {
  children: React.ReactNode;
};

function RegisterLayoutContent({ children }: Props) {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;

    return localStorage.getItem("theme") === "dark";
  });

  const { progress } = useRegisterProgress();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div
      className="
      flex
      flex-col
      min-h-screen
      bg-background
      text-foreground
      "
    >
      <ProgressNavbar dark={dark} setDark={setDark} progress={progress} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

export default function RegisterLayout({ children }: Props) {
  return (
    <RegisterProgressProvider>
      <RegisterLayoutContent>{children}</RegisterLayoutContent>
    </RegisterProgressProvider>
  );
}
