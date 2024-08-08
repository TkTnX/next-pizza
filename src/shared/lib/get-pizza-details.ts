import { Ingredient, Variants } from "@prisma/client";
import { mapPizzaType, mapSize, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (type: PizzaType, size: PizzaSize, items: Variants[], ingredients: Ingredient[], selectedIngredients: Set<number>) => {
      const totalPrice = calcTotalPizzaPrice({
        items,
        type,
        size,
        ingredients,
        selectedIngredients,
      });
    const textDetails = `${size} см, ${mapPizzaType[type]} тесто ${mapSize[size]} ингредиенты (${selectedIngredients.size} шт.)`;
    
    return {totalPrice, textDetails}
}