"use client";
import React from "react";
import { Title } from "./title";
import FilterCheckbox from "./filterCheckbox";
import { Input, RangeSlider } from "../ui";
import FiltersIngredients from "./filters-ingredients";
import { useSet } from "react-use";

type Props = { className?: string };

export default function Filters({ className }: Props) {
  const [selectedIds, { toggle }] = useSet(new Set<string>([]));
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Фильтрация (верх) */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
      {/* Цена (от и до) */}
      <div className="mt-6 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
            type="number"
          />
          <Input
            placeholder="1000"
            min={100}
            max={1000}
            defaultValue={500}
            type="number"
          />
        </div>

        {/* Цена (слайдер) */}
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />

        {/* Ингредиенты */}
        <div className="mt-6 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Ингредиенты:</p>
          <FiltersIngredients
            selectedIds={selectedIds}
            name="ingredients"
            limit={6}
            onClickCheckbox={(id) => toggle(id)}
          />
        </div>
      </div>
    </div>
  );
}
