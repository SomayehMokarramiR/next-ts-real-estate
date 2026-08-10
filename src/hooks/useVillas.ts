import { useQuery } from "@tanstack/react-query";

async function fetchVillas() {
  const res = await fetch("/api/properties?type=villa");

  if (!res.ok) {
    throw new Error("خطا در دریافت ویلاها");
  }

  const data = await res.json();

  return data.properties;
}

export function useVillas() {
  return useQuery({
    queryKey: ["villas"],
    queryFn: fetchVillas,
  });
}
