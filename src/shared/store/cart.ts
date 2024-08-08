import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails, ICartItem } from "../lib/get-cart-details";
import { CartItemDTO } from "../services/dto/cart.dto";



interface CartInterface {
  loading: boolean;
  error: boolean;
  totalPrice: number;
  items: CartItemDTO[];

  // Получение товаров
  fetchCartItems: () => Promise<any>;

  // Обновление кол-ва товара
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  // Добавление в корзину
  addCartItem: (values: any) => Promise<void>;

  // Удаление из корзины
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartInterface>((set) => ({
  loading: false,
  error: false,
  totalPrice: 0,
  items: [],

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
        set(getCartDetails(data));
        set({items: data.cartItems})
        return data
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: any) => {},
  removeCartItem: async (id: number) => {},
}));
