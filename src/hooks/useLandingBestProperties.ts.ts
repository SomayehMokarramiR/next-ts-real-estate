import { useQuery } from "@tanstack/react-query";
import type { Property } from "./useProperties";

async function fetchLandingBestProperties(): Promise<Property[]> {
  const res = await fetch("/api/properties?featured=true");

  if (!res.ok) {
    throw new Error("خطا در دریافت بهترین اقامتگاه‌های لندینگ");
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "خطا در دریافت اطلاعات");
  }

  return data.properties ?? [];
}

export function useLandingBestProperties() {
  return useQuery({
    queryKey: ["landing-best-properties"],

    queryFn: fetchLandingBestProperties,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
}
