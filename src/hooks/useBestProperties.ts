import { useQuery } from "@tanstack/react-query";
import type { Property } from "./useProperties";

async function fetchBestProperties(): Promise<Property[]> {
  const res = await fetch("/api/properties?featured=true&sort=بالاترین امتیاز");

  if (!res.ok) {
    throw new Error("خطا در دریافت بهترین اقامتگاه‌ها");
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "خطا در دریافت اطلاعات بهترین اقامتگاه‌ها");
  }

  return data.properties ?? [];
}

export function useBestProperties() {
  return useQuery({
    queryKey: ["best-properties"],

    queryFn: fetchBestProperties,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
}
