import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function requireAdminPage() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // کاربر لاگین نیست
    if (!token) {
      redirect("/admin/login");
    }

    const decoded = verifyToken(token) as {
      id: string;
    };

    if (!decoded?.id) {
      redirect("/admin/login");
    }

    const user = await User.findById(decoded.id).select("role").lean();

    if (!user) {
      redirect("/admin/login");
    }

    if (user.role !== "admin") {
      redirect("/");
    }

    return true;
  } catch (error) {
    console.error("ADMIN PAGE AUTH ERROR:", error);

    redirect("/admin/login");
  }
}
