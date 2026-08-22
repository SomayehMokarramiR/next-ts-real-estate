import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import UserDetailClient from "../../../components/templates/users/[id]/UserDetailClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getUser(id: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
    headers: {
      Cookie: `token=${token ?? ""}`,
    },

    cache: "no-store",
  });

  if (!res.ok) {
    console.log("GET USER DETAIL FAILED:", res.status);

    return null;
  }

  return res.json();
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const data = await getUser(id);

  if (!data?.success) {
    notFound();
  }

  return <UserDetailClient data={data} />;
}
