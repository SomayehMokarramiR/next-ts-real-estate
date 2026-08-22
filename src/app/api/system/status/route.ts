import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import AdminSettings from "@/app/models/AdminSettings";

export async function GET() {
  try {
    await connectDB();

    const settings = await AdminSettings.findOne().select("system").lean();

    return NextResponse.json(
      {
        success: true,
        maintenanceMode: settings?.system?.maintenanceMode ?? false,
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
      },
      {
        status: 500,
      },
    );
  }
}
