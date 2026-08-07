"use client";

import { useState } from "react";

interface SearchProps {
  onSearch?: (filters: {
    city: string;
    minPrice: string;
    maxPrice: string;
    type: string;
  }) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");

  function handleSearch() {
    onSearch?.({
      city,
      minPrice,
      maxPrice,
      type,
    });
  }

  return (
    <div>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="شهر"
      />

      <input
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="حداقل قیمت"
      />

      <input
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="حداکثر قیمت"
      />

      <button onClick={handleSearch}>اعمال فیلتر</button>
    </div>
  );
}
