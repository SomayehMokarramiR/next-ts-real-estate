export const runtime = "nodejs";
import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import AdminSettings from "@/app/models/AdminSettings";

export async function GET() {
  try {
    await connectDB();

    const settings = await AdminSettings.findOne().select("system").lean();

    const system = settings?.system as {
      maintenanceMode?: boolean;
      userRegistration?: boolean;
      userLogin?: boolean;
    };

    return NextResponse.json(
      {
        success: true,

        maintenanceMode: system?.maintenanceMode ?? false,

        userRegistration: system?.userRegistration ?? true,

        userLogin: system?.userLogin ?? true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("SYSTEM STATUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        maintenanceMode: false,
        userRegistration: true,
        userLogin: true,
      },
      {
        status: 500,
      },
    );
  }
}
