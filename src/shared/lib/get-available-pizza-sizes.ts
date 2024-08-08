import { Variants } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";

export const getAvailablePizzaSizes = (type: PizzaType, items: Variants[]) => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => pizza.size === Number(item.value)
    ),
  }));

  return availablePizzaSizes;
};
