"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useUrlParams from "./useUrlParams";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { label: "None", value: "none" },
  { label: "Price: Low to High", value: "price-low-to-high" },
  { label: "Price: High to Low", value: "price-high-to-low" },
  { label: "Brand: A-Z", value: "brand-a-z" },
  { label: "Brand: Z-A", value: "brand-z-a" },
] as const;

export default function SortComponent() {
  const searchParams = useSearchParams();
  const { updateUrlParamsForSorting } = useUrlParams({});

  const onSortChange = (value: string) => {
    updateUrlParamsForSorting(value);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1 text-sm font-medium"
        data-testid="sort-by-button"
      >
        sort by <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={cn("", {
              "text-gray-900 bg-blue-100":
                searchParams.get("sortBy") === option.value,
            })}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
