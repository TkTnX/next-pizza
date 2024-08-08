import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/variants-selector";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib/get-available-pizza-sizes";
import { Variants } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  toggleIngredients: (id: number) => void;
  availablePizzaSizes: Variant[];
}

export const useFindAvailableSize = (
  items: Variants[]
): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<number>([])
  );
  const availablePizzaSizes = getAvailablePizzaSizes(type, items);

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(
      (item) => item.value === String(size) && !item.disabled
    );
    const availableSize = availablePizzaSizes.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    toggleIngredients,
    availablePizzaSizes,
  };
};
