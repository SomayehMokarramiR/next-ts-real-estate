"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useMe } from "@/hooks/useAuth";
import AccountShell from "../components/templates/account/AccountShell";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (!isLoading && (isError || !data?.user)) {
      router.replace("/login");
    }
  }, [data, isError, isLoading, router]);

  // Loading
  if (isLoading) {
    return (
      <div
        className="
          flex
          h-screen
          items-center
          justify-center
          bg-[#F7F8FA]
          dark:bg-[#1F1F1F]
        "
        dir="rtl"
      >
        <div
          className="
            h-10
            w-10
            rounded-full
            border-4
            border-primary500/20
            border-t-primary500
            animate-spin
          "
        />
      </div>
    );
  }

  // Not authenticated
  if (isError || !data?.user) {
    return null;
  }

  return <AccountShell>{children}</AccountShell>;
}
