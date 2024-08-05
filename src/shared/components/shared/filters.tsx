"use client";
import React from "react";
import { Title } from "./title";
import { Input, RangeSlider } from "../ui";
import FiltersIngredients from "./filters-ingredients";
import { useFilters } from "../../hooks/use-filters";
import { useIngredients } from "../../hooks/use-ingredients";

export default function Filters({ className }: { className: string }) {
  const {
    selectedIds,
    selectedSizes,
    selectedType,
    price,
    setPrice,
    toggle,
    toggleSizes,
    toggleType,
    onChangePrices,
  } = useFilters();
  const { items, isLoading } = useIngredients();

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Фильтрация (тип теста) */}
      <p className="font-bold mb-3">Тип теста</p>

      <FiltersIngredients
        value={selectedType}
        name="type"
        className="mb-5"
        onClickCheckbox={(id) => toggleType(id)}
        values={[
          { name: "Традиционное", value: "traditional", id: "1" },
          { name: "Тонкое", value: "tonkoe", id: "2" },
        ]}
      />
      {/* Фильтрация (верх) */}
      <p className="font-bold mb-3">Размеры</p>

      <FiltersIngredients
        value={selectedSizes}
        name="sizes"
        className="mb-5"
        onClickCheckbox={(id) => toggleSizes(id)}
        values={[
          { name: "20 см", value: "20", id: "20" },
          { name: "30 см", value: "30", id: "30" },
          { name: "40 см", value: "40", id: "40" },
        ]}
      />

      {/* Цена (от и до) */}
      <div className="mt-6 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            placeholder="0"
            min={0}
            max={1000}
            type="number"
            value={String(price.priceFrom)}
            onChange={(e) =>
              onChangePrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            placeholder="1000"
            min={100}
            max={1000}
            type="number"
            value={String(price.priceTo)}
            onChange={(e) => onChangePrices("priceTo", Number(e.target.value))}
          />
        </div>

        {/* Цена (слайдер) */}
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />

        {/* Ингредиенты */}
        <div className="mt-6 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Ингредиенты:</p>
          <FiltersIngredients
            value={selectedIds}
            name="ingredients"
            limit={6}
            onClickCheckbox={(id) => toggle(id)}
            values={items}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
