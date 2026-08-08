import { useQuery } from "@tanstack/react-query";

export interface Property {
  _id: string;

  title: string;

  description?: string;

  type: "apartment" | "villa" | "house" | "hotel" | "suite";

  images: string[];

  location: {
    city: string;
    address: string;
  };

  facilities: {
    bedrooms: number;
    bathrooms: number;
    parking: boolean;
    pool: boolean;
    capacity: number;
  };

  pricing: {
    daily: number;
    monthly?: number;

    oldPrice?: number;

    discount?: number;
  };

  rating: number;

  views: number;

  status: "available" | "reserved" | "inactive";
}
interface PropertyResponse {
  success: boolean;
  property: Property;
}

async function getProperty(propertyId: string): Promise<Property> {
  const res = await fetch(`/api/properties/${propertyId}`);

  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات ملک");
  }

  const data: PropertyResponse = await res.json();

  if (!data.success || !data.property) {
    throw new Error("اطلاعات ملک پیدا نشد");
  }

  return data.property;
}

export function useProperty(propertyId?: string) {
  return useQuery<Property, Error>({
    queryKey: ["property", propertyId],

    queryFn: () => getProperty(propertyId!),

    enabled: !!propertyId,

    // داده تا ۵ دقیقه fresh است
    staleTime: 5 * 60 * 1000,

    // داده تا ۳۰ دقیقه در Cache نگه داشته می‌شود
    gcTime: 30 * 60 * 1000,

    // جلوگیری از درخواست مجدد هنگام برگشتن به پنجره
    refetchOnWindowFocus: false,

    // تا زمانی که داده fresh است هنگام mount مجدد درخواست نمی‌زند
    refetchOnMount: false,
  });
}
