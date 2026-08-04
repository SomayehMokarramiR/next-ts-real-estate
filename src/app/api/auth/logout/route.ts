import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "خروج با موفقیت انجام شد",
      },
      { status: 200 },
    );

    // حذف Cookie توکن
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی در خروج رخ داد",
      },
      { status: 500 },
    );
  }
}
