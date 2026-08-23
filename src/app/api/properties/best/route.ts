import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";

import Property from "@/app/models/Property";

export async function GET() {
  try {
    await connectDB();

    const bestProperties = await Property.aggregate([
      {
        $match: {
          status: "available",
        },
      },

      {
        $lookup: {
          from: "reservations",
          let: {
            propertyId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$propertyId", "$$propertyId"],
                    },
                    {
                      $in: ["$status", ["confirmed", "completed"]],
                    },
                  ],
                },
              },
            },
          ],
          as: "reservations",
        },
      },

      {
        $addFields: {
          reservationCount: {
            $size: "$reservations",
          },

          score: {
            $add: [
              {
                $multiply: [
                  {
                    $ifNull: ["$views", 0],
                  },
                  0.3,
                ],
              },

              {
                $multiply: [
                  {
                    $ifNull: ["$rating", 0],
                  },
                  20,
                ],
              },

              {
                $multiply: [
                  {
                    $size: "$reservations",
                  },
                  50,
                ],
              },
            ],
          },
        },
      },

      {
        $sort: {
          score: -1,
          createdAt: -1,
        },
      },

      {
        $limit: 10,
      },

      {
        $project: {
          reservations: 0,
          score: 0,
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,

        properties: bestProperties.map((item) => ({
          ...item,
          _id: item._id.toString(),
        })),
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("BEST PROPERTIES ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: "خطا در دریافت بهترین اقامتگاه ها",
      },
      {
        status: 500,
      },
    );
  }
}
