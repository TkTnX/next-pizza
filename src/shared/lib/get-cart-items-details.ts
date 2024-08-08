import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { ICartItem } from "./get-cart-details";

export const getCartItemsDetails = (
  ingredients: ICartItem["ingredients"] ,
  pizzaType: PizzaType,
  pizzaSize: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};