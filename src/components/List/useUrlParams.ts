import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

type UseUrlParamsProps = {
  label?: string | number;
};

type UpdateUrlParamsOptions = {
  key: string;
  value: string | null;
  scroll?: boolean;
};

export default function useUrlParams({ label }: UseUrlParamsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const labelLower = label?.toString().toLowerCase() ?? "";

  const currentValues = useMemo(() => {
    const currentValue = searchParams.get(labelLower) ?? "";
    return currentValue ? currentValue.split(",") : [];
  }, [searchParams, labelLower]);

  const updateUrlParams = useCallback(
    ({ key, value, scroll = false }: UpdateUrlParamsOptions) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (value === null || value === "") {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }

      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll,
      });
    },
    [searchParams, router, pathname]
  );

  const updateUrlParamsForSelection = useCallback(
    (option: string | number) => {
      const optionStr = option.toString();
      const newValues = currentValues.includes(optionStr)
        ? currentValues.filter((value) => value !== optionStr)
        : [...currentValues, optionStr];

      updateUrlParams({
        key: labelLower,
        value: newValues.length > 0 ? newValues.join(",") : null,
      });
    },
    [currentValues, labelLower, updateUrlParams]
  );

  const updateUrlParamsForSlider = useCallback(
    (option: { min: number; selected: number }) => {
      updateUrlParams({
        key: labelLower,
        value:
          option.selected === option.min ? null : option.selected.toString(),
      });
    },
    [labelLower, updateUrlParams]
  );

  const updateUrlParamsForSorting = useCallback(
    (value: string) => {
      updateUrlParams({
        key: "sortBy",
        value: value === "none" ? null : value,
      });
    },
    [updateUrlParams]
  );

  const updateUrlParamsForSearch = useCallback(
    (value: string) => {
      updateUrlParams({
        key: "search",
        value: value || null,
      });
    },
    [updateUrlParams]
  );

  return {
    currentValues,
    updateUrlParamsForSelection,
    updateUrlParamsForSlider,
    updateUrlParamsForSorting,
    updateUrlParamsForSearch,
  };
}
