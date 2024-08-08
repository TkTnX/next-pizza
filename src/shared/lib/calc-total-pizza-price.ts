import { Ingredient, Variants } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";


/**
 * Функция для подсчета общей стоимости пиццы
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - выбранные ингредиенты
 * @param selectedIngredients - выбранные ингредиенты
 * @returns  общая стоимость пиццы
 */

interface calcTotalPizzaPriceProps {
    items: Variants[];
    type: PizzaType;
    size: PizzaSize;
    ingredients: Ingredient[];
    selectedIngredients: Set<number>;
}

export const calcTotalPizzaPrice = ({ items, type, size, ingredients, selectedIngredients }: calcTotalPizzaPriceProps) => {
      const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)
          ?.price ?? 0;
      const totalIngredientsPrice = ingredients
        .filter((item) => selectedIngredients.has(item.id))
        .reduce((acc, item) => acc + item.price, 0);
    
    return pizzaPrice + totalIngredientsPrice;
}