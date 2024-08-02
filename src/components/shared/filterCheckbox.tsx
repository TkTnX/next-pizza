import React from "react";
import { Checkbox, Skeleton } from "../ui";

export type FilterCheckboxProps = {
  text: string;
  value?: string;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
};

export default function FilterCheckbox({
  text,
  value,
  onCheckedChange,
  checked,
  name,
}: FilterCheckboxProps) {

 

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="rounded-[8px] w-6 h-6"
        id={`checkbox-${name}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${name}-${String(value)}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
    </div>
  );
}
