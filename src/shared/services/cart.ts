import { axiosInstance } from "./axios";
import { ApiRoutes } from "./constants";
import { CartDTO } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);
  return data;
};

export const updateItemQuantity = async (id: number, quantity: number) => {
  const { data } = await axiosInstance.patch<CartDTO>(
    `${ApiRoutes.CART}/${id}`,
    {
      quantity,
    }
  );

  return data;
};
