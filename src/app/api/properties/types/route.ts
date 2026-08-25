export const runtime = "nodejs";
import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Property from "@/app/models/Property";

const TRANSACTION_TYPES = [
  {
    value: "sale",
    label: "خرید و فروش",
  },
  {
    value: "rent",
    label: "اجاره",
  },
  {
    value: "mortgage",
    label: "رهن",
  },
  {
    value: "rent-mortgage",
    label: "رهن و اجاره",
  },
] as const;

export async function GET() {
  try {
    await connectDB();

    const transactionTypes = await Property.distinct("transactionType");

    const types = TRANSACTION_TYPES.filter((item) =>
      transactionTypes.includes(item.value),
    );

    return NextResponse.json(
      {
        success: true,
        types,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET PROPERTY TRANSACTION TYPES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت انواع معاملات",
      },
      {
        status: 500,
      },
    );
  }
}
