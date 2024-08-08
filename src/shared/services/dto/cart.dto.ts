import { Cart, CartItem, Ingredient, Product, Variants } from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: any;
  ingredients: Ingredient[];
  pizzaSize?: 20 | 30 | 40;
  pizzaType?: 1 | 2 | 3;
};

export interface CartDTO extends Cart {
  cartItems: CartItemDTO[];
}
