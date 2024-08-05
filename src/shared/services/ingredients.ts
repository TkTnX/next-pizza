import { axiosInstance } from "./axios"
import { ApiRoutes } from "./constants"

export const getAllIngredients = async () => { 
    return await axiosInstance.get(ApiRoutes.INGREDIENTS)
}