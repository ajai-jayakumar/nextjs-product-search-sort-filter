"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Input } from "../ui/input";
import useUrlParams from "./useUrlParams";

export default function SearchComponent() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(searchText);
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);

  const { updateUrlParamsForSearch } = useUrlParams({});

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch !== searchText) {
      updateUrlParamsForSearch(debouncedSearch);
    }
  }, [debouncedSearch, searchText, updateUrlParamsForSearch]);

  return (
    <div className="w-1/2">
      <Input
        type="text"
        placeholder="Search by brand or model"
        className="w-full p-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        value={search}
      />
    </div>
  );
}
