"use client";
import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { Input, RangeSlider } from "../ui";
import FiltersIngredients from "./filters-ingredients";
import { useSet } from "react-use";
import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";

type Props = {
  className?: string;
};

type PriceProps = {
  priceFrom: number;
  priceTo: number;
};

export default function Filters({ className }: Props) {
  const [price, setPrice] = useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  });
    const [items, setItems] = React.useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
  const [selectedIds, { toggle }] = useSet(new Set<string>([]));
  const [selectedSizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [selectedType, { toggle: toggleType }] = useSet(new Set<string>([]));

  const onChangePrices = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...price,
      [name]: value,
    });
  };

    useEffect(() => {
      Api.ingredients.getAllIngredients().then(({ data }) => {
        setItems(data);
        setIsLoading(false);
      });
    }, []);

  useEffect(() => {
    console.log({ selectedIds, selectedSizes, selectedType, price });
  }, [selectedIds, selectedSizes, selectedType, price]);

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
          { name: "Традиционное", value: "traditional", id:"1" },
          { name: "Тонкое", value: "tonkoe", id:"2" },
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
          { name: "20 см", value: "20", id: "1" },
          { name: "30 см", value: "30", id: "2" },
          { name: "40 см", value: "40", id: "3" },
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
          value={[price.priceFrom, price.priceTo]}
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
