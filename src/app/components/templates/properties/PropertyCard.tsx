import Image from "next/image";
import Link from "next/link";
import type { Property } from "./types/property";

import PropertyFavoriteButton from "./PropertyFavoriteButton";

//   _id: string;

//   title?: string;

//   images?: string[];

//   location?: {
//     city?: string;
//     address?: string;
//   };

//   pricing?: {
//     daily?: number;
//     monthly?: number;
//     mortgage?: number;
//   };

//   transactionType?: "rent" | "mortgage" | "rent-mortgage" | "sale";

//   rating?: number;

//   facilities?: {
//     bedrooms?: number;
//     bathrooms?: number;
//     capacity?: number;
//     parking?: boolean;
//   };
// };

type Props = {
  property: Property;
};

function getPropertyImage(property: Property) {
  return property.images?.[0] || "/images/placeholder.jpg";
}

export default function PropertyCard({ property }: Props) {
  return (
    <Link href={`/properties/${property._id}`}>
      <div className="relative rounded-2xl overflow-hidden">
        <div className="relative h-52">
          <Image
            src={getPropertyImage(property)}
            alt={property.title || "property"}
            fill
            className="object-cover"
          />

          <div className="absolute top-3 left-3 z-10">
            <PropertyFavoriteButton propertyId={property._id} />
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold">{property.title}</h3>

          <p className="text-sm text-gray-500">{property.location?.city}</p>
        </div>
      </div>
    </Link>
  );
}
