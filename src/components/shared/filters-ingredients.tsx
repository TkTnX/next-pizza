"use client";
import * as React from "react";
import FilterCheckbox  from "./filterCheckbox";
import { Input, Skeleton } from "../ui";
import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
interface IFiltersIngredientsProps {
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  className?: string;
  selectedIds: any;
  name: string
}

const FiltersIngredients: React.FunctionComponent<IFiltersIngredientsProps> = ({
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onClickCheckbox,
  defaultValue,
  selectedIds,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [inpVal, setInpVal] = React.useState("");
  const [items, setItems] = React.useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const showAllList = showAll ? items : items.slice(0, limit);

  React.useEffect(() => {
    Api.ingredients.getAllIngredients().then(({ data }) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-5 w-full rounded-[8px]" />
          ))}
        <Skeleton className="w-28 h-6 mb-5  rounded-[8px]" />
      </div>
    );
  }

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
          .filter((item) =>
            item.name.toLowerCase().includes(inpVal.toLowerCase())
          )
          .map((item) => (
            <FilterCheckbox
              key={item.id}
              text={item.name}
              value={String(item.id)}
              checked={selectedIds.has(String(item.id))}
              onCheckedChange={() => onClickCheckbox?.(String(item.id))}
              name={name}
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
