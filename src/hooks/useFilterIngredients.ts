import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

interface ReturnProps {
  items: Ingredient[];
  isLoading: boolean
}
export const useFilterIngredients = () => {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function getIngredients() {
      try {
        setIsLoading(true);
        const { data } = await Api.ingredients.getAllIngredients();
        setItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getIngredients();
  }, [isLoading]);
  
  return items
};
