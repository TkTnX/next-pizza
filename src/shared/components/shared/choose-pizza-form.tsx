"use client";
import { cn } from "@/shared/lib/utils";
import * as React from "react";
import ProductImage from "./productImage";
import { Title } from "./title";
import { Button } from "../ui";
import VariantsSelector from "./variants-selector";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { ProductWithRelations } from "@/@types/prisma";
import { Ingredient as IngredientType } from "@prisma/client";
import Ingredient from "./ingredient";
import { useSet } from "react-use";

interface IChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: IngredientType[];
  items?: any[];
  onClickAdd?: VoidFunction;
}

const ChoosePizzaForm: React.FunctionComponent<IChoosePizzaFormProps> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, {toggle: toggleIngredients}] = useSet(new Set<number>([]))

  // TEMP DATA
  const textDetails = "30 см, традиционное тесто 30, 590 г";
  const totalPrice = 590;
  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage src={imageUrl} alt={name} size={size} />
      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col justify-between">
          <div className="grid gap-5 mt-5 ">
            <VariantsSelector
              selectedValue={String(size)}
              onClick={(value) => setSize(Number(value) as PizzaSize)}
              items={pizzaSizes}
            />

            <VariantsSelector
              selectedValue={String(type)}
              onClick={(value) => setType(Number(value) as PizzaType)}
              items={pizzaTypes}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 max-h-[420px] my-10 overflow-auto scrollbar rounded-md bg-gray-50">
            {ingredients.map((ingredient) => (
              <Ingredient
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => toggleIngredients(ingredient.id)}
                key={ingredient.id}
                {...ingredient}
              />
            ))}
          </div>

          <Button className="h-[55px] px-10 text-base rounded-[18px] w-full block mt-5">
            Добавить в корзину за {totalPrice} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;
