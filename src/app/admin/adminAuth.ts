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
      redirect("/login");
    }

    const decoded = verifyToken(token) as {
      id: string;
    };

    if (!decoded?.id) {
      redirect("/login");
    }

    const user = await User.findById(decoded.id).select("role").lean();

    // کاربر وجود ندارد
    if (!user) {
      redirect("/login");
    }

    // کاربر ادمین نیست
    if (user.role !== "admin") {
      redirect("/");
    }

    return true;
  } catch (error) {
    console.error("ADMIN PAGE AUTH ERROR:", error);

    redirect("/login");
  }
}
