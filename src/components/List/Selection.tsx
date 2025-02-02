"use client";

import useUrlParams from "./useUrlParams";

export default function Selection({
  label,
  options,
}: {
  label: string;
  options: (string | number)[];
}) {
  const { currentValues, updateUrlParamsForSelection } = useUrlParams({
    label,
  });

  return (
    <ul>
      {options.map((option, index) => (
        <li key={option} className="flex gap-2 my-2 text-gray-700">
          <input
            type="checkbox"
            value={option}
            id={`${option}-${index}`}
            onChange={(e) => updateUrlParamsForSelection(e.target.value)}
            aria-label={option.toString()}
            checked={currentValues.includes(option.toString())}
          />
          <label htmlFor={`${option}-${index}`}>{option}</label>
        </li>
      ))}
    </ul>
  );
}
