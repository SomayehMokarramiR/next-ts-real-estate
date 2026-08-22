"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;

  userRole?: string;

  allowedRoles: string[];
}

export default function RoleAccessGuard({
  children,

  userRole,

  allowedRoles,
}: Props) {
  const router = useRouter();

  const hasAccess = userRole && allowedRoles.includes(userRole);

  useEffect(() => {
    if (!hasAccess) {
      router.replace("/");
    }
  }, [hasAccess, router]);

  if (!hasAccess) {
    return null;
  }

  return children;
}
