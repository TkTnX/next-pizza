import { axiosInstance } from "./axios"
import { ApiRoutes } from "./constants"
import { CartDTO } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => { 
    const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);
    return data
}      