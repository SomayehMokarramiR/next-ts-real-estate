"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  isAdmin: boolean;
}

export default function AdminGuard({ children, isAdmin }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return children;
}
