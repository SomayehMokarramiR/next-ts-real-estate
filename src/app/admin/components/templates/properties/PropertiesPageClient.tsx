"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface AdminProperty {
  _id: string;

  title: string;

  type: string;

  status: string;

  location?: {
    city?: string;
  };

  createdAt: string;
}

interface AdminPropertiesResponse {
  success: boolean;

  properties: AdminProperty[];

  total: number;

  totalPages: number;

  currentPage: number;

  limit: number;
}

async function getAdminProperties(params: {
  search?: string;
  page: number;
  limit: number;
}): Promise<AdminPropertiesResponse> {
  const query = new URLSearchParams();

  query.append("page", String(params.page));
  query.append("limit", String(params.limit));

  if (params.search) {
    query.append("search", params.search);
  }

  const res = await fetch(`/api/admin/properties?${query.toString()}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در دریافت املاک");
  }

  return data;
}

export default function PropertiesPageClient() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  const { data, isLoading, error } = useQuery<AdminPropertiesResponse>({
    queryKey: ["admin-properties", search, page],

    queryFn: () =>
      getAdminProperties({
        search,
        page,
        limit,
      }),
  });

  const properties = data?.properties ?? [];

  const totalPages = data?.totalPages ?? 1;

  return (
    <div
      dir="rtl"
      className="
      w-full
      p-6
      "
    >
      <h1
        className="
        text-2xl
        font-bold
        mb-6
        dark:text-white
        "
      >
        مدیریت املاک
      </h1>

      {/* Search */}

      <div
        className="
    bg-white
    dark:bg-[#353535]
    rounded-2xl
    p-4
    mb-5
  "
      >
        <div
          className="
      relative
      max-w-md
    "
        >
          <Search
            size={18}
            className="
        absolute
        right-3
        top-3
        text-gray-400
      "
          />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="جستجوی عنوان، شهر یا نوع ملک..."
            className="
        w-full
        pr-10
        pl-3
        py-2.5
        rounded-xl
        border
        outline-none
        text-right
        bg-transparent
        dark:bg-[#222]
        dark:text-white
        dark:border-gray-700
      "
          />
        </div>
      </div>
      {isLoading && (
        <div className="text-center py-10 text-gray-500">
          در حال دریافت املاک...
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center py-10 text-red-500">
          خطا در دریافت املاک
        </div>
      )}

      {!isLoading && !error && properties.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          ملکی برای نمایش وجود ندارد
        </div>
      )}

      {!isLoading && !error && properties.length > 0 && (
        <div
          className="
          bg-white
          dark:bg-[#353535]
          rounded-2xl
          overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead
                className="
                bg-gray-100
                dark:bg-[#444]
                "
              >
                <tr>
                  <th className="p-4 text-right">عنوان</th>

                  <th className="p-4 text-right">شهر</th>

                  <th className="p-4 text-right">نوع</th>

                  <th className="p-4 text-right">وضعیت</th>

                  <th className="p-4 text-right">تاریخ</th>
                </tr>
              </thead>

              <tbody>
                {properties.map((property) => (
                  <tr
                    key={property._id}
                    className="
                    border-b
                    dark:border-gray-700
                    "
                  >
                    <td className="p-4 dark:text-white">{property.title}</td>

                    <td className="p-4 dark:text-white">
                      {property.location?.city || "-"}
                    </td>

                    <td className="p-4 dark:text-white">{property.type}</td>

                    <td className="p-4 dark:text-white">{property.status}</td>

                    <td className="p-4 dark:text-white">
                      {new Date(property.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

          {totalPages > 1 && (
            <div
              className="
              flex
              justify-center
              items-center
              gap-2
              py-5
              flex-wrap
              "
            >
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="
                px-4
                py-2
                rounded-xl
                bg-gray-200
                disabled:opacity-40
                dark:bg-[#444]
                dark:text-white
                "
              >
                قبلی
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => index + 1,
              ).map((item) => (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`
                  w-9
                  h-9
                  rounded-full

                  ${
                    page === item
                      ? "bg-primary500 text-white"
                      : "bg-gray-200 dark:bg-[#444] dark:text-white"
                  }
                  `}
                >
                  {item}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="
                px-4
                py-2
                rounded-xl
                bg-gray-200
                disabled:opacity-40
                dark:bg-[#444]
                dark:text-white
                "
              >
                بعدی
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
