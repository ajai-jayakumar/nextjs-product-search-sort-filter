import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

interface UseUrlParamsProps {
  label: string | number;
  searchParams: Record<string, string>;
}

export default function useUrlParams({
  label,
  searchParams,
}: UseUrlParamsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const labelLower = label.toString().toLowerCase();

  const currentValues = useMemo(() => {
    const currentValue = searchParams[labelLower] ?? "";
    return currentValue ? currentValue.split(",") : [];
  }, [searchParams, labelLower]);

  const updateSelectionParams = useCallback(
    (option: string | number) => {
      const optionStr = option.toString();
      const newValues = currentValues.includes(optionStr)
        ? currentValues.filter((value) => value !== optionStr)
        : [...currentValues, optionStr];

      const newSearchParams = new URLSearchParams(searchParams);

      if (newValues.length > 0) {
        newSearchParams.set(labelLower, newValues.join(","));
      } else {
        newSearchParams.delete(labelLower);
      }

      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [searchParams, router, pathname, currentValues, labelLower]
  );

  const updateSliderParams = useCallback(
    (option: { min: number; selected: number }) => {
      const newValues = option.selected;

      const newSearchParams = new URLSearchParams(searchParams);

      if (newValues === option.min) {
        newSearchParams.delete(labelLower);
      } else {
        newSearchParams.set(labelLower, newValues.toString());
      }

      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [searchParams, router, pathname, labelLower]
  );

  return {
    currentValues,
    updateSelectionParams,
    updateSliderParams,
  };
}
