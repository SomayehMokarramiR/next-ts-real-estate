"use client";

import { useState } from "react";

import ProgressNavbar from "../modules/navbarProgress/ProgressNavbar";
import Footer from "./footer/Footer";

import {
  RegisterProgressProvider,
  useRegisterProgress,
} from "@/app/context/RegisterProgressContext";

type Props = {
  children: React.ReactNode;
};

function RegisterLayoutContent({ children }: Props) {
  const [dark, setDark] = useState(false);

  const { progress } = useRegisterProgress();

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
