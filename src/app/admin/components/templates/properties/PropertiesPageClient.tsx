"use client";

import { useState } from "react";
import Link from "next/link";

import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";

import { useAdminDeleteProperty } from "@/hooks/useAdminDeleteProperty";

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

// =========================
// TYPE LABELS
// =========================

const propertyTypeLabels: Record<string, string> = {
  apartment: "آپارتمان",
  villa: "ویلا",
  house: "خانه",
  land: "زمین",
  office: "اداری",
  commercial: "تجاری",
};

// =========================
// STATUS LABELS
// =========================

const propertyStatusLabels: Record<string, string> = {
  available: "فعال",
  reserved: "رزرو شده",
  inactive: "غیرفعال",
  sold: "فروخته شده",
};

// =========================
// HELPERS
// =========================

function getPropertyTypeLabel(type: string) {
  return propertyTypeLabels[type] || type || "-";
}

function getPropertyStatusLabel(status: string) {
  return propertyStatusLabels[status] || status || "-";
}

// =========================
// API
// =========================

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

// =========================
// COMPONENT
// =========================

export default function PropertiesPageClient() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  const deleteMutation = useAdminDeleteProperty();

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

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "حذف ملک",

      text: "آیا از حذف این ملک مطمئن هستید؟",

      icon: "warning",

      showCancelButton: true,

      cancelButtonText: "انصراف",

      confirmButtonText: "بله، حذف شود",

      reverseButtons: false,

      buttonsStyling: true,
    });

    if (!result.isConfirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",

          title: "حذف شد",

          text: "ملک با موفقیت حذف شد",

          confirmButtonText: "باشه",
        });
      },

      onError: (error) => {
        Swal.fire({
          icon: "error",

          title: "خطا",

          text: error instanceof Error ? error.message : "حذف ملک انجام نشد",

          confirmButtonText: "باشه",
        });
      },
    });
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div dir="rtl" className="w-full p-6">
      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >
        <h1
          className="
            text-2xl
            font-bold
            dark:text-white
          "
        >
          مدیریت املاک
        </h1>

        <Link
          href="/admin/properties/create"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-primary500
            px-5
            py-2.5
            text-sm
            font-bold
            text-white
          "
        >
          <Plus size={18} />
          افزودن ملک جدید
        </Link>
      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div
        className="
          mb-5
          rounded-2xl
          bg-white
          p-4
          dark:bg-[#353535]
        "
      >
        <div className="relative max-w-md">
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
              rounded-xl
              border
              py-2.5
              pr-10
              outline-none
              dark:bg-[#222]
              dark:text-white
            "
          />
        </div>
      </div>

      {/* =========================
          LOADING
      ========================= */}

      {isLoading && (
        <div className="py-10 text-center">در حال دریافت املاک...</div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="py-10 text-center text-red-500">
          خطا در دریافت املاک
        </div>
      )}

      {/* =========================
          EMPTY
      ========================= */}

      {!isLoading && !error && properties.length === 0 && (
        <div
          className="
            rounded-2xl
            bg-white
            p-10
            text-center
            text-gray-500
            dark:bg-[#353535]
          "
        >
          ملکی پیدا نشد
        </div>
      )}

      {/* =========================
          TABLE
      ========================= */}

      {!isLoading && !error && properties.length > 0 && (
        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-white
            dark:bg-[#353535]
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

                  <th className="p-4 text-right">عملیات</th>
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
                    {/* TITLE */}

                    <td className="p-4 dark:text-white">{property.title}</td>

                    {/* CITY */}

                    <td className="p-4 dark:text-white">
                      {property.location?.city || "-"}
                    </td>

                    {/* TYPE */}

                    <td className="p-4 dark:text-white">
                      {getPropertyTypeLabel(property.type)}
                    </td>

                    {/* STATUS */}

                    <td className="p-4 dark:text-white">
                      {getPropertyStatusLabel(property.status)}
                    </td>

                    {/* DATE */}

                    <td className="p-4 dark:text-white">
                      {new Date(property.createdAt).toLocaleDateString("fa-IR")}
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">
                      <div className="flex gap-2">
                        {/* VIEW */}

                        <Link
                          href={`/admin/properties/${property._id}`}
                          className="
                            rounded-lg
                            bg-blue-100
                            p-2
                            text-blue-600
                          "
                        >
                          <Eye size={16} />
                        </Link>

                        {/* EDIT */}

                        <Link
                          href={`/admin/properties/${property._id}/edit`}
                          className="
                            rounded-lg
                            bg-yellow-100
                            p-2
                            text-yellow-600
                          "
                        >
                          <Edit size={16} />
                        </Link>

                        {/* DELETE */}

                        <button
                          disabled={deleteMutation.isPending}
                          onClick={() => handleDelete(property._id)}
                          className="
                            rounded-lg
                            bg-red-100
                            p-2
                            text-red-600
                            disabled:opacity-50
                          "
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =========================
              PAGINATION
          ========================= */}

          {totalPages > 1 && (
            <div
              className="
                flex
                justify-center
                gap-2
                py-5
              "
            >
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="
                  rounded-xl
                  bg-gray-200
                  px-4
                  py-2
                  disabled:opacity-40
                "
              >
                قبلی
              </button>

              <span className="px-4 py-2">{page}</span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="
                  rounded-xl
                  bg-gray-200
                  px-4
                  py-2
                  disabled:opacity-40
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
