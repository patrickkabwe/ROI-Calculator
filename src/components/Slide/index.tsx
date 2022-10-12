import React, { FC } from "react";
import { kFormatter } from "../../utils";

interface Props {
  min: string;
  max: string;
  steps: number;
  value: number;
  disabled?: boolean;
  onChange: (e: any) => void;
}

export const Slide: FC<Props> = ({
  min = "0",
  max = "0",
  steps = 10,
  value = 0,
  onChange,
  disabled = false,
}) => {
  const minRange = parseInt(min || "0", 10);
  const maxRange = parseInt(max || "0", 10);
  const step = (maxRange - minRange) / steps; //

  return (
    <div>
      <span
        style={{
          left: `${((value - minRange) / (maxRange - minRange)) * 100 - 1}%`,
        }}
        className={`relative bg-primary-50 px-2 py-.5 mb-2.5 text-secondary-100 rounded inline-block before:absolute before:w-[17px] before:h-[17px] before:rotate-45 before:top-1/2 before:bg-primary-50 before:-z-20 before:left-1/2 before:-translate-x-[50%]`}
      >
        {kFormatter(value)}
      </span>
      <input
        value={value}
        onChange={onChange}
        type="range"
        min={minRange}
        step={step}
        max={maxRange}
        disabled={disabled}
        className="w-full relative range h-2 in-range:bg-secondary-100 disabled:in-range:h-0 in-range:h-[1px] bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};
