"use client";

import { useEffect, useState } from "react";

import ReserveProgressWrapper from "./ReserveProgressWrapper";
import ProgressNavbar from "../modules/navbarProgress/ProgressNavbar";
import Footer from "./footer/Footer";

type Props = {
  children: React.ReactNode;
};

export default function ReserveLayout({ children }: Props) {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <ReserveProgressWrapper>
      <div
        className="
        flex
        flex-col
        bg-background
        text-foreground
        "
      >
        <ProgressNavbar dark={dark} setDark={setDark} />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </ReserveProgressWrapper>
  );
}
