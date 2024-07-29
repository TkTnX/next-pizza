"use client";
import * as React from "react";
import FilterCheckbox, { FilterCheckboxProps } from "./filterCheckbox";
import { Input } from "../ui";

type Item = FilterCheckboxProps;
interface IFiltersIngredientsProps {
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

const FiltersIngredients: React.FunctionComponent<IFiltersIngredientsProps> = ({
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onChange,
  defaultValue,
  className,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [inpVal, setInpVal] = React.useState("");
  const showAllList = showAll ? items : defaultItems?.slice(0, limit);

  return (
    <div>
      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            value={inpVal}
            onChange={(e) => setInpVal(e.target.value)}
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {showAllList
          .filter((item) => item.text.toLowerCase().includes(inpVal.toLowerCase()))
          .map((item, index) => (
            <FilterCheckbox
              key={index}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={false}
              onCheckedChange={(ids) => console.log(ids)}
            />
          ))}
      </div>
      {items.length > limit && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className={`text-primary text-base text-left mt-5 hover:opacity-80 w-full ${
            showAll ? "border-t border-t-neutral-100 mt-4" : ""
          }`}
        >
          {showAll ? "- Свернуть" : "+ Показать всё"}
        </button>
      )}
    </div>
  );
};

export default FiltersIngredients;
