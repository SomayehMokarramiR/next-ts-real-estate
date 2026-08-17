"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useMe } from "@/hooks/useAuth";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data, isLoading } = useMe();

  const user = data?.user;

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/account");
      return;
    }
  }, [user, isLoading, router]);

  console.log("ADMIN USER:", user);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        در حال بررسی دسترسی...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return children;
}
