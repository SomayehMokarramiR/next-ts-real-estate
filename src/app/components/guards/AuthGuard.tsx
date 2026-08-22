"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  authenticated: boolean;
}

export default function AuthGuard({ children, authenticated }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.replace("/login");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null;
  }

  return children;
}
