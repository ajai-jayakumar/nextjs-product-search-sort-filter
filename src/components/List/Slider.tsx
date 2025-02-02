"use client";

import { Slider } from "../ui/slider";
import useUrlParams from "./useUrlParams";
import { useState, useEffect } from "react";

export default function SliderComponent({
  min,
  max,

  label,
}: {
  min: number;
  max: number;
  label: string;
}) {
  const [sliderValue, setSliderValue] = useState(min);
  const { currentValues, updateUrlParamsForSlider } = useUrlParams({
    label,
  });

  useEffect(() => {
    if (currentValues.length > 0) {
      setSliderValue(Number(currentValues[0]));
    }
  }, [currentValues]);

  const handleValueChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  return (
    <div>
      <div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 mb-2">
          <span>Min</span>
          <span>Max</span>
        </div>
        <Slider
          defaultValue={[Number(currentValues[0]) || min]}
          min={min}
          max={max}
          step={1}
          onValueChange={handleValueChange}
          onValueCommit={(value) =>
            updateUrlParamsForSlider({ min, selected: value[0] })
          }
          aria-label="slider"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600 mt-2">
          <span>{`€${min.toLocaleString()}`}</span>
          <span>{`€${sliderValue.toLocaleString()}`}</span>
        </div>
      </div>
    </div>
  );
}
