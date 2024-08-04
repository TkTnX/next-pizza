"use client"
import { cn } from "@/lib/utils";
import * as React from "react";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface IVariantsSelectorProps {
  className?: string;
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  selectedValue?: Variant["value"];
}

const VariantsSelector: React.FunctionComponent<IVariantsSelectorProps> = ({
  className,
  items,
  onClick,
  selectedValue,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none"
      )}
    >
      {items.map((item) => (
        <button
          className={cn(
            "flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-300 text-sm",
            {
              "bg-white shadow": item.value === selectedValue,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
          key={item.value}
          onClick={() => onClick?.(item.value)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default VariantsSelector;
